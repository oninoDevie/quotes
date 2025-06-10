class ObjectiveTracker {
    constructor() {
        // DOM Elements
        this.filterPrioritySelect = document.getElementById('filterPriority');
        this.addObjectiveForm = document.getElementById('addObjectiveForm');
        this.priorityFormSelect = document.getElementById('priorityForm');
        this.urgencyFormSelect = document.getElementById('urgencyForm');
        this.objectivesTableBody = document.getElementById('objectivesTableBody');
        this.loadingMessage = document.getElementById('loadingMessage');
        this.noObjectivesMessage = document.getElementById('noObjectivesMessage');
        this.mainContent = document.querySelector('.main-content');

        // State
        this.objectives = [];
        this.loading = true;
        this.editingId = null;
        this.tempTitulo = "";
        this.userId = null;

        // Order mapping for objective states
        this.stateOrder = { "En Progreso": 1, "Pendiente": 2, "Completado": 3 };

        this.init();
    }

    async init() {
        await this.ensureClerkLoadedAndSignedIn();

        if (this.userId) {
            this.bindEvents();
            await this.fetchObjectives();
        } else {
            this.showSignInMessage();
        }

        if (typeof feather !== 'undefined') {
            feather.replace();
        }
    }

    async ensureClerkLoadedAndSignedIn() {
        try {
            if (!window.Clerk) {
                console.error("Clerk JS SDK not loaded. Please ensure clerk.browser.js is included.");
                return;
            }
            await window.Clerk.load();
            if (window.Clerk.user) {
                this.userId = window.Clerk.user.id;
            } else {
                console.log("User not signed in.");
            }
        } catch (error) {
            console.error("Error loading Clerk or getting user ID:", error);
        }
    }

    showSignInMessage() {
        if (this.mainContent) {
            this.mainContent.innerHTML = `
                <div class="text-center p-8">
                    <h1 class="tracker-title">Tracker de Objetivos</h1>
                    <p class="tracker-subtitle">Debes iniciar sesión para usar el tracker</p>
                </div>
            `;
        }
    }

    bindEvents() {
        if (this.filterPrioritySelect) {
            this.filterPrioritySelect.addEventListener('change', () => this.fetchObjectives());
        }
        if (this.addObjectiveForm) {
            this.addObjectiveForm.addEventListener('submit', (e) => this.handleAddObjective(e));
        }

        if (this.objectivesTableBody) {
            this.objectivesTableBody.addEventListener('click', (e) => {
                const target = e.target;
                if (target.classList.contains('rename-btn')) {
                    const id = target.dataset.id;
                    const objective = this.objectives.find(obj => obj.id === id);
                    if (objective) this.handleRename(objective);
                } else if (target.classList.contains('save-btn')) {
                    const id = target.dataset.id;
                    this.handleSaveRename(id);
                } else if (target.classList.contains('delete-btn')) {
                    const id = target.dataset.id;
                    this.handleDelete(id);
                }
            });

            this.objectivesTableBody.addEventListener('change', (e) => {
                const target = e.target;
                if (target.classList.contains('status-select')) {
                    const id = target.dataset.id;
                    const newEstado = target.value;
                    this.handleChangeEstado(id, newEstado);
                }
            });
        }
    }

    async fetchObjectives() {
        this.setLoading(true);
        this.showNoObjectivesMessage(false);
        try {
            const token = await window.Clerk.session?.getToken();
            const response = await fetch(`/api/objectives?priority=${this.filterPrioritySelect.value}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to fetch objectives');
            }
            const data = await response.json();
            this.objectives = this.sortObjectives(data);
            this.renderObjectives();
        } catch (error) {
            console.error("Error fetching objectives:", error);
            alert("Error al cargar objetivos: " + error.message);
        } finally {
            this.setLoading(false);
        }
    }

    async handleAddObjective(e) {
        e.preventDefault();
        if (!this.userId) {
            alert("Debes iniciar sesión para agregar objetivos");
            return;
        }

        const priority = this.priorityFormSelect.value;
        const urgency = this.urgencyFormSelect.value;

        const countForPriority = this.objectives.filter(obj => obj.priority === priority).length;
        if (countForPriority >= 3) {
            alert("Máximo 3 objetivos por prioridad alcanzado.");
            return;
        }

        try {
            const newObj = {
                titulo: "Nuevo objetivo",
                priority: priority,
                estado: "Pendiente",
                urgency: urgency,
            };
            const token = await window.Clerk.session?.getToken();
            const response = await fetch(`/api/objectives`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(newObj),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to add objective');
            }

            await this.fetchObjectives();

        } catch (error) {
            console.error("Error adding objective:", error);
            alert("Error al agregar objetivo: " + error.message);
        }
    }

    async handleChangeEstado(id, newEstado) {
        if (!this.userId) {
            alert("Debes iniciar sesión para actualizar objetivos");
            return;
        }
        try {
            const token = await window.Clerk.session?.getToken();
            const response = await fetch(`/api/objectives/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ estado: newEstado }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to update objective status');
            }
            await this.fetchObjectives();
        } catch (error) {
            console.error("Error updating objective status:", error);
            alert("Error al actualizar estado: " + error.message);
        }
    }

    handleRename(obj) {
        this.editingId = obj.id;
        this.tempTitulo = obj.titulo;
        this.renderObjectives();
    }

    async handleSaveRename(id) {
        if (!this.userId) {
            alert("Debes iniciar sesión para renombrar objetivos");
            return;
        }
        try {
            const newTitulo = this.tempTitulo.trim() || "Nuevo objetivo";
            const token = await window.Clerk.session?.getToken();
            const response = await fetch(`/api/objectives/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ titulo: newTitulo }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to rename objective');
            }

            this.editingId = null;
            this.tempTitulo = "";
            await this.fetchObjectives();
        } catch (error) {
            console.error("Error updating objective title:", error);
            alert("Error al renombrar objetivo: " + error.message);
        }
    }

    async handleDelete(id) {
        if (!this.userId) {
            alert("Debes iniciar sesión para eliminar objetivos");
            return;
        }
        if (!confirm("¿Estás seguro de que quieres eliminar este objetivo?")) {
            return;
        }
        try {
            const token = await window.Clerk.session?.getToken();
            const response = await fetch(`/api/objectives/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to delete objective');
            }

            await this.fetchObjectives();
        } catch (error) {
            console.error("Error deleting objective:", error);
            alert("Error al eliminar objetivo: " + error.message);
        }
    }

    sortObjectives(data) {
        const currentFilterPriority = this.filterPrioritySelect.value;
        const filtered = data.filter(obj => obj.priority === currentFilterPriority);
        return filtered.sort((a, b) => {
            const diffPriority = parseInt(a.priority) - parseInt(b.priority);
            if (diffPriority !== 0) return diffPriority;
            return (this.stateOrder[a.estado] || 999) - (this.stateOrder[b.estado] || 999);
        });
    }

    renderObjectives() {
        if (!this.objectivesTableBody) return; // Ensure element exists

        this.objectivesTableBody.innerHTML = '';

        if (this.objectives.length === 0) {
            this.showNoObjectivesMessage(true);
            return;
        }
        this.showNoObjectivesMessage(false);

        this.objectives.forEach(obj => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="px-4 py-2 border-b border-pink-700">
                    ${this.editingId === obj.id ? `
                        <input
                            type="text"
                            class="bg-gray-700 p-1 border border-pink-400 rounded"
                            value="${this.tempTitulo.replace(/"/g, '&quot;')}"
                            data-id="${obj.id}"
                        />
                    ` : obj.titulo}
                </td>
                <td class="px-4 py-2 border-b border-pink-700">${obj.priority}</td>
                <td class="px-4 py-2 border-b border-pink-700">${obj.urgency || "+"}</td>
                <td class="px-4 py-2 border-b border-pink-700">
                    <select class="bg-gray-700 p-1 border border-pink-400 rounded status-select" data-id="${obj.id}">
                        <option value="En Progreso" ${obj.estado === "En Progreso" ? "selected" : ""}>En Progreso</option>
                        <option value="Pendiente" ${obj.estado === "Pendiente" ? "selected" : ""}>Pendiente</option>
                        <option value="Completado" ${obj.estado === "Completado" ? "selected" : ""}>Completado</option>
                    </select>
                </td>
                <td class="px-4 py-2 border-b border-pink-700">
                    ${this.editingId === obj.id ? `
                        <button class="bg-green-600 hover:bg-green-500 text-white font-bold px-3 py-1 rounded mr-2 save-btn" data-id="${obj.id}">
                            Guardar
                        </button>
                    ` : `
                        <button class="bg-blue-600 hover:bg-blue-500 text-white font-bold px-3 py-1 rounded mr-2 rename-btn" data-id="${obj.id}">
                            Renombrar
                        </button>
                    `}
                    <button class="bg-red-600 hover:bg-red-500 text-white font-bold px-3 py-1 rounded delete-btn" data-id="${obj.id}">
                        Eliminar
                    </button>
                </td>
            `;
            this.objectivesTableBody.appendChild(row);
        });

        if (this.editingId) {
            const inputField = this.objectivesTableBody.querySelector(`input[data-id="${this.editingId}"]`);
            if (inputField) {
                inputField.focus();
                inputField.addEventListener('input', (e) => {
                    this.tempTitulo = e.target.value;
                });
            }
        }
    }

    setLoading(isLoading) {
        if (this.loadingMessage) {
            this.loadingMessage.style.display = isLoading ? 'block' : 'none';
        }
        if (this.objectivesTableBody) {
            this.objectivesTableBody.style.display = isLoading ? 'none' : 'table-row-group';
        }
        if (this.noObjectivesMessage) {
            if (isLoading || this.objectives.length > 0) {
                this.noObjectivesMessage.style.display = 'none';
            } else {
                this.noObjectivesMessage.style.display = 'block';
            }
        }
    }

    showNoObjectivesMessage(show) {
        if (this.noObjectivesMessage) {
            this.noObjectivesMessage.style.display = show ? 'block' : 'none';
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new ObjectiveTracker();
});

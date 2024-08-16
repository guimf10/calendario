document.addEventListener("DOMContentLoaded", function() {
    const monthYearElement = document.getElementById("monthYear");
    const calendarDaysElement = document.getElementById("calendar-days");
    const prevButton = document.getElementById("prev");
    const nextButton = document.getElementById("next");
    const holidayModal = document.getElementById("holidayModal");
    const closeModal = document.getElementById("closeModal");
    const holidayTitle = document.getElementById("holidayTitle");
    const holidayDescription = document.getElementById("holidayDescription");

    // Formulário de lembrete
    const reminderForm = document.getElementById("reminderForm");
    const reminderDateInput = document.getElementById("reminderDate");
    const reminderTextInput = document.getElementById("reminderText");
    const addReminderButton = document.getElementById("addReminder");
    const closeReminderFormButton = document.getElementById("closeReminderForm");

    let currentYear = new Date().getFullYear();
    let currentMonth = new Date().getMonth();

    // Lista de feriados nacionais brasileiros em 2024 com detalhes
    const holidays = {
        0: { 1: "Ano Novo - Celebração do início do novo ano." },
        1: { 13: "Carnaval - Feriado popular com desfiles e festas." },
        2: { 29: "Sexta-feira Santa - Comemoração religiosa da crucificação de Jesus." },
        3: { 21: "Tiradentes - Homenagem a Joaquim José da Silva Xavier." },
        4: { 1: "Dia do Trabalho - Celebração dos trabalhadores.", 9: "Corpus Christi - Comemoração religiosa do corpo de Cristo." },
        5: { 15: "São João - Festival tradicional com danças e comidas típicas." },
        6: { 9: "Feriado Estadual - São Paulo - Comemoração local." },
        7: { 7: "Feriado Estadual - São Paulo - Comemoração local." },
        8: { 7: "Independência do Brasil - Celebração da independência do país.", 12: "Nossa Senhora de Aparecida - Padroeira do Brasil." },
        9: { 12: "Nossa Senhora Aparecida - Celebração da padroeira do Brasil." },
        10: { 2: "Finados - Homenagem aos mortos.", 15: "Proclamação da República - Comemoração da proclamação da República do Brasil." },
        11: { 25: "Natal - Celebração do nascimento de Jesus Cristo." }
    };

    // Lembretes armazenados no armazenamento local
    const reminders = JSON.parse(localStorage.getItem("reminders")) || {};

    function renderCalendar(year, month) {
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startDay = firstDay.getDay();

        calendarDaysElement.innerHTML = "";

        // Adicionar dias vazios para o início do mês
        for (let i = 0; i < startDay; i++) {
            const emptyDiv = document.createElement("div");
            calendarDaysElement.appendChild(emptyDiv);
        }

        // Adicionar dias do mês
        for (let day = 1; day <= daysInMonth; day++) {
            const dayDiv = document.createElement("div");
            dayDiv.textContent = day;

            // Verificar se o dia atual é um feriado
            if (holidays[month] && holidays[month][day]) {
                dayDiv.classList.add("holiday");
                dayDiv.title = `Feriado: ${day}/${month + 1}/${year}`;
                dayDiv.dataset.holiday = holidays[month][day];
                dayDiv.addEventListener("click", showHolidayDetails);
            }

            // Adicionar lembretes ao dia
            const reminderKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            if (reminders[reminderKey]) {
                dayDiv.classList.add("has-reminder");
                dayDiv.dataset.reminder = reminders[reminderKey];
                dayDiv.addEventListener("click", showReminderDetails);
            }

            dayDiv.addEventListener("dblclick", () => showReminderForm(day));
            calendarDaysElement.appendChild(dayDiv);
        }

        monthYearElement.textContent = `${firstDay.toLocaleString('default', { month: 'long' })} ${year}`;
    }

    function showHolidayDetails(event) {
        const details = event.target.dataset.holiday;
        holidayTitle.textContent = `Feriado: ${event.target.textContent}/${currentMonth + 1}/${currentYear}`;
        holidayDescription.textContent = details;
        holidayModal.style.display = "block";
    }

    function showReminderForm(day) {
        reminderDateInput.value = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        reminderForm.style.display = "block";
    }

    function showReminderDetails(event) {
        const details = event.target.dataset.reminder;
        alert(`Lembrete para ${event.target.textContent}: ${details}`);
    }

    function addReminder() {
        const date = reminderDateInput.value;
        const text = reminderTextInput.value;

        if (date && text) {
            reminders[date] = text;
            localStorage.setItem("reminders", JSON.stringify(reminders));
            renderCalendar(currentYear, currentMonth);
            reminderForm.style.display = "none";
        }
    }

    function closeReminderForm() {
        reminderForm.style.display = "none";
    }

    closeModal.addEventListener("click", () => {
        holidayModal.style.display = "none";
    });

    closeReminderFormButton.addEventListener("click", closeReminderForm);

    window.addEventListener("click", (event) => {
        if (event.target === holidayModal) {
            holidayModal.style.display = "none";
        }
    });

    prevButton.addEventListener("click", () => {
        if (currentMonth === 0) {
            currentMonth = 11;
            currentYear--;
        } else {
            currentMonth--;
        }
        renderCalendar(currentYear, currentMonth);
    });

    nextButton.addEventListener("click", () => {
        if (currentMonth === 11) {
            currentMonth = 0;
            currentYear++;
        } else {
            currentMonth++;
        }
        renderCalendar(currentYear, currentMonth);
    });

    addReminderButton.addEventListener("click", addReminder);

    // Renderizar o calendário inicial
    renderCalendar(currentYear, currentMonth);
});
document.addEventListener("DOMContentLoaded", function() {
    const monthYearElement = document.getElementById("monthYear");
    const calendarDaysElement = document.getElementById("calendar-days");
    const prevButton = document.getElementById("prev");
    const nextButton = document.getElementById("next");
    const holidayModal = document.getElementById("holidayModal");
    const closeModal = document.getElementById("closeModal");
    const holidayTitle = document.getElementById("holidayTitle");
    const holidayDescription = document.getElementById("holidayDescription");

    // Formulário de lembrete
    const reminderForm = document.getElementById("reminderForm");
    const reminderDateInput = document.getElementById("reminderDate");
    const reminderTextInput = document.getElementById("reminderText");
    const addReminderButton = document.getElementById("addReminder");
    const closeReminderFormButton = document.getElementById("closeReminderForm");

    let currentYear = new Date().getFullYear();
    let currentMonth = new Date().getMonth();

    // Lista de feriados nacionais brasileiros em 2024 com detalhes
    const holidays = {
        0: { 1: "Ano Novo - Celebração do início do novo ano." },
        1: { 13: "Carnaval - Feriado popular com desfiles e festas." },
        2: { 29: "Sexta-feira Santa - Comemoração religiosa da crucificação de Jesus." },
        3: { 21: "Tiradentes - Homenagem a Joaquim José da Silva Xavier." },
        4: { 1: "Dia do Trabalho - Celebração dos trabalhadores.", 9: "Corpus Christi - Comemoração religiosa do corpo de Cristo." },
        5: { 15: "São João - Festival tradicional com danças e comidas típicas." },
        6: { 9: "Feriado Estadual - São Paulo - Comemoração local." },
        7: { 7: "Feriado Estadual - São Paulo - Comemoração local." },
        8: { 7: "Independência do Brasil - Celebração da independência do país.", 12: "Nossa Senhora de Aparecida - Padroeira do Brasil." },
        9: { 12: "Nossa Senhora Aparecida - Celebração da padroeira do Brasil." },
        10: { 2: "Finados - Homenagem aos mortos.", 15: "Proclamação da República - Comemoração da proclamação da República do Brasil." },
        11: { 25: "Natal - Celebração do nascimento de Jesus Cristo." }
    };

    // Lembretes armazenados no armazenamento local
    const reminders = JSON.parse(localStorage.getItem("reminders")) || {};

    function renderCalendar(year, month) {
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startDay = firstDay.getDay();

        calendarDaysElement.innerHTML = "";

        // Adicionar dias vazios para o início do mês
        for (let i = 0; i < startDay; i++) {
            const emptyDiv = document.createElement("div");
            calendarDaysElement.appendChild(emptyDiv);
        }

        // Adicionar dias do mês
        for (let day = 1; day <= daysInMonth; day++) {
            const dayDiv = document.createElement("div");
            dayDiv.textContent = day;

            // Verificar se o dia atual é um feriado
            if (holidays[month] && holidays[month][day]) {
                dayDiv.classList.add("holiday");
                dayDiv.title = `Feriado: ${day}/${month + 1}/${year}`;
                dayDiv.dataset.holiday = holidays[month][day];
                dayDiv.addEventListener("click", showHolidayDetails);
            }

            // Adicionar lembretes ao dia
            const reminderKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            if (reminders[reminderKey]) {
                dayDiv.classList.add("has-reminder");
                dayDiv.dataset.reminder = reminders[reminderKey];
                dayDiv.addEventListener("click", showReminderDetails);
            }

            dayDiv.addEventListener("dblclick", () => showReminderForm(day));
            calendarDaysElement.appendChild(dayDiv);
        }

        monthYearElement.textContent = `${firstDay.toLocaleString('default', { month: 'long' })} ${year}`;
    }

    function showHolidayDetails(event) {
        const details = event.target.dataset.holiday;
        holidayTitle.textContent = `Feriado: ${event.target.textContent}/${currentMonth + 1}/${currentYear}`;
        holidayDescription.textContent = details;
        holidayModal.style.display = "block";
    }

    function showReminderForm(day) {
        reminderDateInput.value = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        reminderTextInput.value = ""; // Limpar o campo de lembrete
        reminderForm.style.display = "block";
    }

    function showReminderDetails(event) {
        const details = event.target.dataset.reminder;
        alert(`Lembrete para ${event.target.textContent}: ${details}`);
    }

    function addReminder() {
        const date = reminderDateInput.value;
        const text = reminderTextInput.value;

        if (date && text) {
            reminders[date] = text;
            localStorage.setItem("reminders", JSON.stringify(reminders));
            renderCalendar(currentYear, currentMonth);
            reminderForm.style.display = "none";
        }
    }

    function closeReminderForm() {
        reminderForm.style.display = "none";
    }

    closeModal.addEventListener("click", () => {
        holidayModal.style.display = "none";
    });

    closeReminderFormButton.addEventListener("click", closeReminderForm);

    window.addEventListener("click", (event) => {
        if (event.target === holidayModal) {
            holidayModal.style.display = "none";
        }
        if (event.target === reminderForm) {
            reminderForm.style.display = "none";
        }
    });

    prevButton.addEventListener("click", () => {
        if (currentMonth === 0) {
            currentMonth = 11;
            currentYear--;
        } else {
            currentMonth--;
        }
        renderCalendar(currentYear, currentMonth);
    });

    nextButton.addEventListener("click", () => {
        if (currentMonth === 11) {
            currentMonth = 0;
            currentYear++;
        } else {
            currentMonth++;
        }
        renderCalendar(currentYear, currentMonth);
    });

    addReminderButton.addEventListener("click", addReminder);

    // Renderizar o calendário inicial
    renderCalendar(currentYear, currentMonth);
});

// script.js
const apiUrl = "http://localhost:3000/employees";

$(document).ready(function () {
  const modal = $("#formModal");
  const closeBtn = $(".close");

  function resetForm() {
    $("#employeeForm")[0].reset();
    $("#empId").val("");
    $("#emailError").text("");
  }

  function openModal(title) {
    $("#formTitle").text(title);
    modal.show();
  }

  function closeModal() {
    modal.hide();
    resetForm();
  }

  $("#addUserBtn").click(() => openModal("Add Employee"));
  closeBtn.click(() => closeModal());
  $(window).click((e) => {
    if ($(e.target).is(modal)) closeModal();
  });

  function renderEmployees(employees) {
    const list = $("#employeeList");
    list.empty();
    let totalSalary = 0;

    employees.forEach((emp, index) => {
      totalSalary += parseFloat(emp.salary);
      list.append(`
        <tr>
          <td>${index + 1}</td>
          <td>${emp.name}</td>
          <td>${emp.email}</td>
          <td>${emp.phone}</td>
          <td>₹${emp.salary}</td>
          <td class="actions">
            <button class="edit" data-id="${emp.id}">Edit</button>
            <button class="delete" data-id="${emp.id}">Delete</button>
          </td>
        </tr>
      `);
    });

    $("#activeUsers").text(employees.length);
    $("#totalSalary").text(`₹${totalSalary}`);
    $("#payrollAmount").text(`₹${(totalSalary * 0.9).toFixed(2)}`); // example diff for payroll
  }

  function loadEmployees() {
    $.get(apiUrl, renderEmployees);
  }

  function isDuplicate(email, phone, currentId = null) {
    return $.get(apiUrl).then((data) => {
      return data.some(emp =>
        (emp.email === email || emp.phone === phone) &&
        emp.id !== parseInt(currentId)
      );
    });
  }

  $(document).on("submit", "#employeeForm", async function (e) {
  e.preventDefault();

  const id = $("#empId").val();
  const name = $("#name").val();
  const email = $("#email").val();
  const phone = $("#phone").val();
  const salary = $("#salary").val();
  const isEditing = !!id;

  if (!isEditing) {
    // Validate only on Add
    const emailRegex = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    const phoneRegex = /^[6-9]\d{9}$/;

    if (!emailRegex.test(email)) {
      $("#emailError").text("Invalid email format!");
      return;
    }

    if (!phoneRegex.test(phone)) {
      $("#emailError").text("Invalid phone number format!");
      return;
    }
  }
    if (!isEditing) {
      const duplicate = await isDuplicate(email, phone);
      if (duplicate) {
        $("#emailError").text("Email or phone number already exists!");
        return;
      }
    }

    const payload = { name, email, phone, salary };

    if (isEditing) {
      $.ajax({
        url: `${apiUrl}/${id}`,
        method: "PUT",
        contentType: "application/json",
        data: JSON.stringify(payload),
        success: () => {
          loadEmployees();
          closeModal();
        },
      });
    } else {
      $.ajax({
        url: apiUrl,
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(payload),
        success: () => {
          loadEmployees();
          closeModal();
        },
      });
    }
  });

  $("#employeeList").on("click", ".edit", function () {
    const id = $(this).data("id");
    $.get(`${apiUrl}/${id}`, (data) => {
      $("#empId").val(data.id);
      $("#name").val(data.name);
      $("#email").val(data.email);
      $("#phone").val(data.phone);
      $("#salary").val(data.salary);
      $("#emailError").text("");
      openModal("Edit Employee");
    });
  });

  $("#employeeList").on("click", ".delete", function () {
    const id = $(this).data("id");
    if (confirm("Are you sure you want to delete this employee?")) {
      $.ajax({
        url: `${apiUrl}/${id}`,
        method: "DELETE",
        success: loadEmployees,
      });
    }
  });

  loadEmployees();
});

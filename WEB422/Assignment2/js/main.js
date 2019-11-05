/*********************************************************************************
* WEB422 – Assignment 2
* I declare that this assignment is my own work in accordance with Seneca Academic Policy.
* No part of this assignment has been copied manually or electronically from any other source
* (including web sites) or distributed to other students.
*
* Name: Dohyung Kim Student ID: 123228173 Date: Sep/27/2019
*
*
********************************************************************************/
let employeesModel = [];

$( document ).ready(function() {
    console.log("jQuery working");

    function initializeEmployeesModel(){
        $.ajax({
            url: "https://pure-mesa-11534.herokuapp.com/employees",
            type: "GET",
            contentType: "application/json"
        })
        .done(function (data) {
            employeesModel = _.take(data, 300);
            refreshEmployeeRows(employeesModel);
        })
        .fail(function (err) {
            showGenericModal('Error', 'Unable to get Employees');
        });
    }
    
    function showGenericModal(title, message) {
        $.ajax({
            url: "https://pure-mesa-11534.herokuapp.com/employees",
            type: "GET",
            contentType: "application/json"
        })
        $(".modal-title").html(title);
        $(".modal-body").html(message);
        $("#genericModal").modal({});
    }
    
    function refreshEmployeeRows(employees){
        $("#employees-table").empty();
        let template = _.template('<% _.forEach(employees, function(employee){%>' +
                '<div class="row body-row" data-id="<%- employee._id %>">' +
                '<div class="col-xs-4 body-column"><%- _.escape(employee.FirstName) %></div>' +
                '<div class="col-xs-4 body-column"><%- _.escape(employee.LastName) %></div>' +
                '<div class="col-xs-4 body-column"><%- _.escape(employee.Position.PositionName) %></div>' +
                '</div>' +
                '<% }); %>');
            $("#employees-table").append(template({ 'employees': employees })
        )
    }

    function getFilteredEmployeesModel(filterString) {
        let filter = _.filter(employeesModel, function (emp) {
            return (emp.FirstName.toLowerCase().includes(filterString.toLowerCase())
                || emp.LastName.toLowerCase().includes(filterString.toLowerCase())
                || emp.Position.PositionName.toLowerCase().includes(filterString.toLowerCase()));
            });
        return filter;
    };

    function getEmployeeModelById(id) {
        let findIdx = _.findIndex(employeesModel, function(employee) { 
            return employee._id === id; 
        });
        return findIdx == null ? null : _.cloneDeep(employeesModel[findIdx]);
    };

    initializeEmployeesModel();

    $( "#employee-search").on("keyup", function(event){
        let filter = getFilteredEmployeesModel(this.value);
        refreshEmployeeRows(filter);
    });

    $(document.body).on('click', '.body-row' ,function(emp){
        let employee = getEmployeeModelById($(this).attr("data-id"));
        if(employee != null){
            
            employee.HireDate = moment(employee.HireDate).format('LL');
            
            let modalContentTemplate = _.template(
                '<strong>Address:</strong> <%- employee.AddressStreet %> <%- employee.AddressCity %>, <%- employee.AddressState %>. <%- employee.AddressZip %></br>' + 
                '<strong>Phone Number:</strong> <%- employee.PhoneNum %> ext: <%- employee.Extension %></br>' +
                '<strong>Hire Date:</strong> <%- employee.HireDate %>' 
            );
            let modalContent = modalContentTemplate({'employee':employee});

            showGenericModal(employee.FirstName + ' ' + employee.LastName, modalContent);
        }
    });
});

/*
$( document ).ready(function() {
    console.log("jQuery working");

    $ ("#teams-menu").on("click", function(event) { 
        event.preventDefault();

        $.ajax({
            url: "https://pure-mesa-11534.herokuapp.com/teams",
            type: "GET",
            contentType: "application/json"
        })
        .done(function (data) {
            $("#data").empty()
            .append("<h3>Teams</h3>")

            let pTag = $("<pre>");
            $(pTag).html(prettyPrintJson.toHtml(data));
            $("#data").append(pTag);
        })
        .fail(function (err) {
            console.log("error: " + err.statusText);
        });
    });

    $ ("#employees-menu").on("click", function(event) { 
        event.preventDefault();

        $.ajax({
            url: "https://pure-mesa-11534.herokuapp.com/employees",
            type: "GET",
            contentType: "application/json"
        })
        .done(function (data) {
            $("#data").empty()
            .append("<h3>Employees</h3>");

            let pTag = $("<pre>");
            $(pTag).html(prettyPrintJson.toHtml(data));
            $("#data").append(pTag);
        })
        .fail(function (err) {
            console.log("error: " + err.statusText);
        });
    });

    $ ("#projects-menu").on("click", function(event) { 
        event.preventDefault();

        $.ajax({
            url: "https://pure-mesa-11534.herokuapp.com/projects",
            type: "GET",
            contentType: "application/json"
        })
        .done(function (data) {
            $("#data").empty()
            .append("<h3>Projects</h3>");
                        
            let pTag = $("<pre>");
            $(pTag).html(prettyPrintJson.toHtml(data));
            $("#data").append(pTag);
        })
        .fail(function (err) {
            console.log("error: " + err.statusText);
        });
    });

    $ ("#positions-menu").on("click", function(event) { 
        event.preventDefault();

        $.ajax({
            url: "https://pure-mesa-11534.herokuapp.com/positions",
            type: "GET",
            contentType: "application/json"
        })
        .done(function (data) {
            $("#data").empty()
            .append("<h3>Positions</h3>");
            
            let pTag = $("<pre>");
            $(pTag).html(prettyPrintJson.toHtml(data));
            $("#data").append(pTag);
        })
        .fail(function (err) {
            console.log("error: " + err.statusText);
        });
    });
});
*/
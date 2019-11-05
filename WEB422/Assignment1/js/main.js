/*********************************************************************************
* WEB422 – Assignment 1
* I declare that this assignment is my own work in accordance with Seneca Academic Policy.
* No part of this assignment has been copied manually or electronically from any other source
* (including web sites) or distributed to other students.
*
* Name: Dohyung Kim Student ID: 123228173 Date: 2019/Sep/13
*
*
********************************************************************************/ 
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
  
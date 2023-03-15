function createElementIn(type, className) {
  var element = document.createElement(type);
  if (className) {
    element.classList.add(className);
  }
  return element;
}

function createParagraph(text, className) {
  var p = createElementIn("p", className);
  p.innerText = text;
  return p;
}

function createUl(className) {
  var ul = createElementIn("ul", className);
  return ul;
}

function createDiv(className) {
  var div = createElementIn("div", className);
  return div;
}

function createButton(text, className, dataPurpose) {
  var btn = createElementIn("button", className);
  btn.innerText = text;
  btn.setAttribute("data-purpose", dataPurpose);
  return btn;
}

function createTODO(text) {
  var li = createElementIn("li", "todo");
  var p = createParagraph(text);
  li.append(p);

  var buttonsContainer = createDiv("buttons");
  var upBtn = createButton("Up", "up", "up");
  var downBtn = createButton("Down", "down", "down");
  var removeBtn = createButton("Remove", "remove", "remove");
  buttonsContainer.append(upBtn);
  buttonsContainer.append(downBtn);
  buttonsContainer.append(removeBtn);
  li.append(buttonsContainer);

  return li;
}

var todoInput = document.getElementById("todo-inputs");

var addTodoBtn = document.getElementById("add-todo");

var mainContainer = document.getElementById("todo-main");

var header = document.getElementById("todo-header");

todoInput.onkeyup = function (e) {
  if (todoInput.value.length > 0) {
    if (e.keyCode === 13) {
      var todo = createTODO(todoInput.value);

      todo.style.opacity = 0;

      setTimeout(function () {
        todo.style.opacity = 1;
      }, 0);

      if (!mainContainer.querySelector(".todo")) {
        var noTodosP = document.querySelector("p.no-todos");
        mainContainer.removeChild(noTodosP);
        var ul = createUl("todo-list");
        ul.append(todo);
        mainContainer.append(ul);
      } else {
        var ul = document.querySelector(".todo-list");
        ul.append(todo);
      }
      todoInput.value = "";
    }
  }
};

addTodoBtn.onclick = function (e) {
  if (todoInput.value.length > 0) {
    var todo = createTODO(todoInput.value);

    todo.style.opacity = 0;

    setTimeout(function () {
      todo.style.opacity = 1;
    }, 0);

    if (!mainContainer.querySelector(".todo")) {
      var noTodoP = document.querySelector("p.no-todos");
      mainContainer.removeChild(noTodoP);
      var ul = createUl("todo-list");
      ul.append(todo);
      mainContainer.append(ul);
    } else {
      var ul = document.querySelector(".todo-list");
      ul.append(todo);
    }
    todoInput.value = "";
  }
};

mainContainer.onclick = function (e) {
  if (e.target.nodeName === "BUTTON") {
    var button = e.target;

    var typeButton = button.getAttribute("data-purpose");

    var li = button.parentElement.parentElement;
    var ul = li.parentElement;

    switch (typeButton) {
      case "remove":
        ul.removeChild(li);
        if (ul.children.length === 0) {
          var p = createParagraph("NO TODOS TO DISPLAY", "no-todos");
          var ul = document.querySelector(".todo-list");
          mainContainer.removeChild(ul);
          mainContainer.append(p);
        }
        break;

      case "up":
        var previousElement = li.previousElementSibling;
        if (previousElement !== null) {
          ul.removeChild(li);
          ul.insertBefore(li, previousElement);
        }
        break;

      case "down":
        var nextElement = li.nextElementSibling;
        if (nextElement !== null) {
          ul.removeChild(li);
          ul.insertBefore(li, nextElement.nextElementSibling);
        }
    }
  }
};

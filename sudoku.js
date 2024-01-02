
let loadDataInfo = null
var errors = 0;
let board = Array.from({ length: 9 }, () => Array.from({ length: 9 }, () => 0));

const MockData = (data) => { // Funcion to load information from Json
    debugger;
    loadDataInfo = JSON.parse(data);
    createSudokuBoard(loadDataInfo); // callback function to create digits number and set numbers.

    ValidationBoard(board);
}

const errorFun = (msg) => {
    alert(msg);
}
let loadPromise = new Promise((load, error) => {
    let httpReq = new XMLHttpRequest();
    httpReq.onload = () => {
        if (httpReq.status == 200)
            load(httpReq.response);
        else
            error(httpReq.statusText);
    }
    httpReq.open("GET", "./MOCK_DATA.json");
    httpReq.send();
}).then(MockData, errorFun);

function createSudokuBoard(data) {
    debugger;

    console.log(board);

    for (let i = 0; i < data.length; i++) {
        if (i == 0) {
            const [col1, row1, val1, col2, row2, val2, col3, row3, val3] = data[i].val.split('').map(Number);
            board[row1 - 1][col1 - 1] = val1;
            board[row2 - 1][col2 - 1] = val2;
            board[row3 - 1][col3 - 1] = val3;
        }
        else if (i == 1) {
            const [col1, row1, val1, col2, row2, val2, col3, row3, val3] = data[i].val.split('').map(Number);
            board[row1 - 1][col1 + 2] = val1;
            board[row2 - 1][col2 + 2] = val2;
            board[row3 - 1][col3 + 2] = val3;
        }
        else if (i == 2) {
            const [col1, row1, val1, col2, row2, val2, col3, row3, val3] = data[i].val.split('').map(Number);
            board[row1 - 1][col1 + 5] = val1;
            board[row2 - 1][col2 + 5] = val2;
            board[row3 - 1][col3 + 5] = val3;
        }
        else if (i == 3) {
            const [col1, row1, val1, col2, row2, val2, col3, row3, val3] = data[i].val.split('').map(Number);
            board[row1 + 2][col1 - 1] = val1;
            board[row2 + 2][col2 - 1] = val2;
            board[row3 + 2][col3 - 1] = val3;
        }
        else if (i == 4) {
            const [col1, row1, val1, col2, row2, val2, col3, row3, val3] = data[i].val.split('').map(Number);
            board[row1 + 2][col1 + 2] = val1;
            board[row2 + 2][col2 + 2] = val2;
            board[row3 + 2][col3 + 2] = val3;
        }
        else if (i == 5) {
            const [col1, row1, val1, col2, row2, val2, col3, row3, val3] = data[i].val.split('').map(Number);
            board[row1 + 2][col1 + 5] = val1;
            board[row2 + 2][col2 + 5] = val2;
            board[row3 + 2][col3 + 5] = val3;
        }
        else if (i == 6) {
            const [col1, row1, val1, col2, row2, val2, col3, row3, val3] = data[i].val.split('').map(Number);
            board[row1 + 5][col1 - 1] = val1;
            board[row2 + 5][col2 - 1] = val2;
            board[row3 + 5][col3 - 1] = val3;
        }
        else if (i == 7) {
            const [col1, row1, val1, col2, row2, val2, col3, row3, val3] = data[i].val.split('').map(Number);
            board[row1 + 5][col1 + 2] = val1;
            board[row2 + 5][col2 + 2] = val2;
            board[row3 + 5][col3 + 2] = val3;
        }
        else if (i == 8) {
            const [col1, row1, val1, col2, row2, val2, col3, row3, val3] = data[i].val.split('').map(Number);
            board[row1 + 5][col1 + 5] = val1;
            board[row2 + 5][col2 + 5] = val2;
            board[row3 + 5][col3 + 5] = val3;
        }
    }

    // Board 9x9
    for (let r = 0; r < 9; r++) {   // row loop 
        //debugger;
        for (let c = 0; c < 9; c++) {  //column loop
            //let tile = document.createElement("div");
            let tile = document.createElement("input");
            tile.type = "text";
            tile.id = r.toString() + "-" + c.toString();  // assign each box row&column id  0-0
            if (board[r][c] != "0") {
                //tile.innerText = board[r][c];
                tile.value = board[r][c];
                tile.setAttribute("disabled", true);
                tile.classList.add("tile-start");
            }
            if (r == 2 || r == 5) {
                tile.classList.add("horizontal-line");  // add horizontal line 
            }
            if (c == 2 || c == 5) {  // add vertical line 
                tile.classList.add("vertical-line");
            }
            tile.addEventListener("change", validInput);
            tile.classList.add("tile");

            document.getElementById("board").append(tile);
        }
    }

}

const validInput = (event) => {
    let flag = false;
    for (let i = 1; i < 10; i++) {
        if (event.target.value == i || event.target.value == '') {
            flag = true;
            if (event.target.value != '') {
                event.target.classList.remove("empty");
                event.target.classList.remove("test");
                const [r, c] = event.target.id.split('-').map(Number);
                board[r][c] = Number(event.target.value);
            }
            break;
        }
    }
    if (flag == false) {
        alert("Please input only one digit from 1-9")
        event.target.value = '';
        event.target.classList.add("empty");
    }
}

function ValidationBoard(board) {

    let btnValid = document.querySelector("button");
    btnValid.innerText = "Validate";
    btnValid.type = "button";

    btnValid.addEventListener("click", () => {
        checkDuplicates(board);
    })
}

function checkDuplicates(board) {
    debugger;
    // Check rows
    for (let i = 0; i < board.length; i++) {
        let rowMap = {};
        for (let j = 0; j < board[i].length; j++) {
            if (board[i][j] !== 0) {
                if (rowMap[board[i][j]]) {
                    document.getElementById(`${i}-${j}`).classList.add("rowred");
                    errors += 1
                    debugger;
                    alert("Duplicate elements exist");
                    return true; // Duplicate found in row
                }
                rowMap[board[i][j]] = true;
                document.getElementById("errors").innerText = errors;
            }
            else {
                alert("Please fill out the empty boxes");
                return false;
            }
        }
    }

    // Check columns
    for (let j = 0; j < board[0].length; j++) {
        let colMap = {};
        for (let i = 0; i < board.length; i++) {
            if (board[i][j] !== 0) {
                if (colMap[board[i][j]]) {
                    document.getElementById(`${i}-${j}`).classList.add("rowred");
                    errors += 1
                    debugger;
                    alert("Duplicate elements exist");
                    return true; // Duplicate found in column
                }
                colMap[board[i][j]] = true;
                document.getElementById("errors").innerText = errors;
            }
        }
    }

    // Check 3x3 subgrids
    for (let row = 0; row < 9; row += 3) {
        for (let col = 0; col < 9; col += 3) {
            let subgridMap = {};
            for (let i = row; i < row + 3; i++) {
                for (let j = col; j < col + 3; j++) {
                    if (board[i][j] !== 0) {
                        if (subgridMap[board[i][j]]) {
                            document.getElementById(`${i}-${j}`).classList.add("rowred");
                            errors += 1
                            debugger;
                            alert("Duplicate elements exist");
                            return true; // Duplicate found in subgrid
                        }
                        subgridMap[board[i][j]] = true;
                        document.getElementById("errors").innerText = errors;
                    }
                }
            }
        }
    }
    alert("You Won!!")
    return false; // No duplicates found
}

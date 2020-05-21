// Create the FSD auto select button in a container div.  It will be styled and
// positioned with CSS.
var multipleTransferGlobal
var zNode = document.createElement ('div');
zNode.innerHTML = '<button id="myButton" type="button">'
                + 'Select Job Details</button>'
                ;
zNode.setAttribute ('id', 'myContainer');
document.body.appendChild (zNode);

//--- Activate the newly added button.
document.getElementById ("myButton").addEventListener (
    "click", ButtonClickAction, false
);

function ButtonClickAction (zEvent) {
    window.getSelection().selectAllChildren(
    document.getElementById("side-panel")
);
    multipleTransfersGlobal = document.getElementById("description").value;
    console.log(multipleTransfersGlobal);
    //GM_setClipboard(multipleTransfersGlobal);
};
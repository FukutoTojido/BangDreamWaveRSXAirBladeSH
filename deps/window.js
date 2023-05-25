minimize = (ele, icon) => {
    let clickState = 0;

    $(`#${icon.id}`).on('click', () => {
        if (!clickState) {
            clickState = 1;
            // ele.style.height = 0;
            // ele.style.padding = '0';
            // ele.style.margin = 0;
            ele.style.opacity = 0;
            // ele.style.display = 'none';
            // ele.style.flex = '0 0';
            icon.style.opacity = '.5';
        } else {
            clickState = 0;
            // ele.style.height = 'calc(50% - 50px)';
            // ele.style.padding = '20px';
            // ele.style.margin = '5px';
            ele.style.opacity = 1;
            // ele.style.display = 'flex';
            // ele.style.flex = '1 1';
            icon.style.opacity = '1';
        }
    })
}

function dragElement(elmnt) {
    var pos1 = 0,
        pos2 = 40,
        pos3 = 0,
        pos4 = 0;
    let draggedX = 0,
        draggedY = 0;
    let dragState = 0;
    let initBottom = parseInt(getComputedStyle(elmnt).bottom),
        initRight = parseInt(getComputedStyle(elmnt).right);
    let eleWidthMargin = parseInt(getComputedStyle(elmnt).width) + 2 * parseInt(getComputedStyle(elmnt).margin) + 2 * parseInt(getComputedStyle(elmnt).padding);
    let eleHeightMargin = parseInt(getComputedStyle(elmnt).height) + 2 * parseInt(getComputedStyle(elmnt).margin) + 2 * parseInt(getComputedStyle(elmnt).padding);

    // document.getElementById(elmnt.id).onmousedown = (e) => {
    //     document.querySelector(`div#${elmnt.id} > div`).style.animation = 'none';
    //     document.querySelector(`#${elmnt.id}Header`).style.animation = 'none';
    //     elmnt.style.animation = 'none';
    //     // $('#windowManager').append($(`#${elmnt.id}`));
    // }

    document.getElementById(elmnt.id + 'Header').onmousedown = (e) => {
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.querySelector(`div#${elmnt.id} > div`).style.animation = 'none';
        document.querySelector(`#${elmnt.id}Header`).style.animation = 'none';
        elmnt.style.animation = 'none';
        $('#windowManager').append($(`#${elmnt.id}`));
        dragMouseDown(e);
    }

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        dragState = 1;
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = e.clientX - pos3;
        pos2 = e.clientY - pos4;
        // set the element's new position:
        elmnt.style.top = `${window.innerHeight - (parseInt(getComputedStyle(elmnt).height) + 2 * parseInt(getComputedStyle(elmnt).margin) + 2 * parseInt(getComputedStyle(elmnt).padding) - (pos2 + draggedY - initBottom))}px`;
        elmnt.style.left = `${window.innerWidth - (eleWidthMargin - (pos1 + draggedX - initRight))}px`;
        elmnt.style.right = `${-(pos1 + draggedX - initRight)}px`;
        elmnt.style.bottom = `${-(pos2 + draggedY - initBottom)}px`;
    }

    function closeDragElement() {
        // stop moving when mouse button is released:
        if (dragState) {
            draggedX += pos1;
            draggedY += pos2;
        }
        dragState = 0;
        document.onmouseup = null;
        document.onmousemove = null;
    }
}
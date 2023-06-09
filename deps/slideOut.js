animationInsert = (element) => {
    let styleSheet = document.createElement('style');
    styleSheet.type = 'text/css';
    document.head.appendChild(styleSheet);

    styleSheet.sheet.insertRule(`@keyframes slideInOf${element.id} {
        0% {
            height: 0px;
        }
        100% {
            height: ${parseInt(getComputedStyle(element).height)}px;
        }
    }`,
        styleSheet.length
    );

    element.style.animation = `slideInOf${element.id} 1s`;
}
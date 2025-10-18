function initMainMenu() {
    let mainMenu = document.querySelector(".main-menu");

    //region: make main-menu width same as search-bar width
    let screenWidth = document.body.clientWidth;
    

    //endregion: make main-menu width same as search-bar width

    const topAd = document.querySelector(".top-ad-container");
    if (topAd) {
        mainMenu.classList.add("with-top-ad");
    }

    const scrollOffset = topAd?.clientHeight ?? 64;

    function scrollFunction(e) {
        if (
            document.body.scrollTop > scrollOffset || // For Safari
            document.documentElement.scrollTop > scrollOffset // For Chrome, Firefox, IE and Opera
        ) {
            mainMenu.classList.add("small");
            mainMenu.classList.remove("rounded-3");
            mainMenu.classList.remove("with-top-ad");
        } else {
            mainMenu.classList.remove("small");
            mainMenu.classList.add("rounded-3");
            if (topAd) mainMenu.classList.add("with-top-ad");
        }
    }

    window.addEventListener("scroll", scrollFunction);
}

window.addEventListener("DOMContentLoaded", () => {
    initMainMenu();
});
function setCssVar(name, value) {
    document.documentElement.style.setProperty(name, value)
}
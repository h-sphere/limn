import { Demo } from "../demos";

const generateDemo = (demo: Demo) => {
    // const container = document.create
}

const sidebar = (container: HTMLDivElement, demos: Demo[]) => {
    demos.forEach(d => {
        generateDemo(d)
    })
}
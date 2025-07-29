import { Outlet } from "react-router"

Outlet
export function Hosting(){
    return(
        <section className="hosting-main-container">
            <Outlet />
        </section>
        
    )
}
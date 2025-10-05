import Navbar from "./navbar"

export default function Home(){
    return(
        <div>
            <Navbar />
            <h2>Welcome to A-D Kay Publications</h2>
            <p>Featured Books: </p>

            <div>
                <div>Killed by Illiteracy</div>
                <div>French Composistion</div>
                <div>The Young Shall Grow</div>
            </div>
        </div>
    )
}

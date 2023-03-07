import Menu from "./Menu/Menu";
import Top from "./Top/Top";
import Supplies from "./Supplies/Supplies";
function Main( ){

    return(
        <div  class="container-xl">
            <div class="row">
                <Top/>
            </div>
            <div class="row">
                <Menu/>
                <div class="col">
                    <Supplies/>
                    
                </div>
            </div>
        </div>
    );
}

export default Main;
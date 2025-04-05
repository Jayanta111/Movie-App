import SliderUtil from "../../component/SliderUtil";
import {useGetNewMovieQuery} from "../../redux/api/movies";
import {Link} from "react-router-dom";


const Header=()=>{
    const {data}=useGetNewMovieQuery();

    return(
        <div className="flex flex-col mt-[2rem] ml[2rem] md:flex-row justify-between items-center md:items-start" >
            <nav className="w-full md:w-[10rem] ml-0 md:ml-2 mb-4 md:mb-0">
<Link to='/' className="transition duration-300 ease-in-out hover:text-teal-200 block p-2 rounded mb-1 md:mb-2 text-lg">
Home
</Link>
            </nav>
            <nav className="w-full md:w-[10rem] ml-0 md:ml-2 mb-4 md:mb-0">
<Link to='/movies' className="transition duration-300 ease-in-out hover:text-teal-200 block p-2 rounded mb-1 md:mb-2 text-lg">
Browser Movies
</Link>
            </nav>
            <div className="w-full md:w-[80%] mr-0 md:mr-2">
<SliderUtil data={data} />

            </div>

        </div>
    )
};
export default Header;

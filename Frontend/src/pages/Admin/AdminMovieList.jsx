import {Link} from 'react-router-dom';
import { useGetAllMoviesQuery } from '../../redux/api/movies';
const AdminMovieList=()=> {
    const {data:movies}=useGetAllMoviesQuery();
  return 
    <div className="container mx-[9rem]">
<div className="flex flex-col md:flex-row">
<div className="ml-[2rem] text-xl font-bold h-12">
    All Movie

</div>

</div>
    </div>
  
}

export default AdminMovieList
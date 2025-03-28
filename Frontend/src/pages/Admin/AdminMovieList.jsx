import { Link } from 'react-router-dom';
import { useGetAllMoviesQuery } from '../../redux/api/movies';

const AdminMovieList = () => {
    const { data: movies } = useGetAllMoviesQuery();

    if (!movies) {
        return <div>Loading...</div>; // Handle loading state
    }

    return (
        <div className="container mx-[9rem]">
            <div className="flex flex-col md:flex-row">
                <div className="ml-[2rem] text-xl font-bold h-12">
                    All Movies ({movies.length})
                </div>
                <div className="flex flex-wrap justify-around items-center p-[2rem]">
                    {movies.map((movie) => (
                        <Link 
                            key={movie._id} 
                            to={`/admin/movies/update/${movie._id}`} 
                            className="block mb-4 overflow-hidden ">
                                <div className="flex">
                                    <div
                                    key={movie._id}
                                   className="max-w-sm m-[2rem] rounded overflow-hidden shadow-lg" >
                                    <img src={movie.image} alt={movie.name}
                                    className="w-full h-48 object-cover"/>

                                   </div>

                                </div>
        
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdminMovieList;
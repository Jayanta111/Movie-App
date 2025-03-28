import { useState } from "react";
import { 
  useCreateGenreMutation, 
  useUpdateGenreMutation, 
  useDeleteGenreMutation, 
  useFetchGenresQuery, 
} from "../../redux/api/genre";
import { toast } from "react-toastify";
import GenreForm from "../../component/GenreForm";
import Modal from "../../component/Modal";

const GenreList = () => {
  const { data: genres = [], error, isLoading, refetch } = useFetchGenresQuery(); // ✅ Provide a default empty array
  
  
  const [name, setName] = useState('');
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [updatingName, setUpdatingName] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const [createGenre] = useCreateGenreMutation();
  const [updateGenre] = useUpdateGenreMutation();
  const [deleteGenre] = useDeleteGenreMutation();

  // Handle Create Genre
  const handleCreateGenre = async (e) => {
    e.preventDefault();
    try {
      await createGenre({ name }).unwrap();
      toast.success("Genre created successfully!");
      setName('');
      refetch();
    } catch (error) {
      toast.error("Failed to create genre!");
    }
  };

  // Handle Update Genre
  const handleUpdateGenre = async (e) => {
    e.preventDefault();
    if (!selectedGenre) return;

    try {
      await updateGenre({ id: selectedGenre._id, name: updatingName }).unwrap();
      toast.success("Genre updated successfully!");
      setModalVisible(false);
      setUpdatingName('');
      setSelectedGenre(null);
      refetch();
    } catch (error) {
      toast.error("Failed to update genre!");
    }
  };

  // Handle Delete Genre
  const handleDeleteGenre = async () => {
    if (!selectedGenre) return;

    try {
      await deleteGenre(selectedGenre._id).unwrap();
      toast.success("Genre deleted successfully!");
      setModalVisible(false);
      setUpdatingName('');
      setSelectedGenre(null);
      refetch();
    } catch (error) {
      toast.error("Failed to delete genre!");
    }
  };

  return (
    <div className="ml-[10rem] flex flex-col md:flex-row">
      <div className="p-3">
        <h1 className="h-12">Manage Genres</h1>

        {/* Display Loading & Error Messages */}
        {isLoading && <p>Loading genres...</p>}
        {error && <p className="text-red-500">Error fetching genres</p>}

        {/* Create Genre Form */}
        <GenreForm value={name} setValue={setName} handleSubmit={handleCreateGenre} />

        <br />

        {/* Genre List */}
        <div className="flex flex-wrap">
        {genres && genres.length > 0 ? (
            genres?.map((genre) => (
              <button
                key={genre._id}
                className="bg-teal-500 text-white py-2 px-4 m-2 rounded-lg 
                           hover:bg-teal-600 focus:outline-none focus:ring-2 
                           focus:ring-teal-500 focus:opacity-75"
                onClick={() => {
                  setModalVisible(true);
                  setSelectedGenre(genre);
                  setUpdatingName(genre.name);
                }}
              >
                {genre.name}
              </button>
            ))
          ) : (
            <p className="text-gray-500">No genres found.</p>
          )}
        </div>

        {/* Update & Delete Genre Modal */}
        <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
          <GenreForm
            value={updatingName}
            setValue={setUpdatingName}
            handleSubmit={handleUpdateGenre}
            buttonText="Update Genre"
            handleDelete={handleDeleteGenre}
          />
        </Modal>
      </div>
    </div>
  );
};

export default GenreList;

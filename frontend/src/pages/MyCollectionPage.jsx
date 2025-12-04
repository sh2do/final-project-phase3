import { useParams, useNavigate } from "react-router-dom";
import { useUserCollection } from "../hooks/useCollection";
import CollectionItemCard from "../components/CollectionItemCard";

const MyCollectionPage = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const {
    collection,
    loading,
    error,
    updateCollectionItem,
    removeFromCollection,
  } = useUserCollection(parseInt(userId));

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <button
          onClick={() => navigate("/")}
          className="mb-6 text-blue-600 hover:text-blue-800 font-medium"
        >
          ← Back to Home
        </button>

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            My Anime Collection
          </h1>
          <p className="text-gray-600">
            User ID: {userId} | {collection.length} anime(s)
          </p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md mb-6">
            Error: {error}
          </div>
        )}

        {collection.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-gray-600 mb-4">
              You haven't added any anime yet!
            </p>
            <button
              onClick={() => navigate("/")}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-md"
            >
              Browse Anime
            </button>
          </div>
        ) : (
          <div>
            {collection.map((item) => (
              <CollectionItemCard
                key={item.id}
                item={item}
                onUpdate={updateCollectionItem}
                onRemove={removeFromCollection}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyCollectionPage;

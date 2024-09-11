import "./App.css"

function App() {
  console.log(import.meta.env.VITE_APPWRITE_URL)

  return (
    <>
      <h1 className="w-1/2 bg-orange-700">Appwrite Blog App</h1>
    </>
  );
}

export default App;

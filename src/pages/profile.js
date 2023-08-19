import { getSession, signOut } from "next-auth/react"
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
// import { signOut } from "next-auth/react";
export default function SignUp({ onFormSubmit }) {

  const titleRef = useRef();
  const descriptionRef = useRef();
  const [listdata, setlistdata] = useState([])
  const [newitem, setnewitem] = useState(0)


  useEffect(() => {
    showDetails()
  }, [newitem])

  const showDetails = async () => {
    try {
      const response = await fetch("/api/products/");
      if (response.ok) {
        const data = await response.json();
        setlistdata(data);
        console.log("Fetched data:", data);
      } else {
        console.error('Failed to fetch data');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }




  const onSubmitHandler = (e) => {
    e.preventDefault();
    debugger
    const title = titleRef.current.value;
    const description = descriptionRef.current.value;
    if(title && title != "" && description && description != "" ){
        // onAdd(title, description);
    const currentDate = new Date(); // Get the current date

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate();
    const formattedDate = `${year}-${month}-${day}`;
    console.log(title, description);
    onSubmit(title, description,formattedDate)
    }
    else{
      alert("Please Fill The Data First")
    }
  }

  const onSubmit = async (title, description,formattedDate) => {
    debugger
    try {
      const response = await fetch("/api/products/", {
        method: "POST",
        body: JSON.stringify({ title, description,formattedDate }),
        headers: {
          "Content-Type": "application/json"
        }
      });
      if (response.ok) {
        debugger
        titleRef.current.value = ""
        descriptionRef.current.value = ""
        let i = newitem + 1
        setnewitem(i)
      }
    } catch (err) {
      console.error(err);
    }

  };

  return (
    <div>
      <div className="addtodo logoutbtn">
        <button onClick={signOut} className="addtodo-btn">Log Out</button>
        <Link
          href="/auth/login"
          class="text-white font-bold listnav">Home</Link>
      </div>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-6 lg:px-8">

        <form onSubmit={onSubmitHandler}>
          <div className="inputdata">
            <div className="inputdata-main">
              <div className="input-data-field">
                <label for="default-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                <input
                  type="text"
                  id="default-input"
                  ref={titleRef}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500
 focus:border-blue-500 block w-full p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
  dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
              </div>
              <div className="input-data-field">
                <label for="large-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Whats in your Mind</label>
                <input
                  ref={descriptionRef}
                  type="text" id="large-input" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500
            focus:border-blue-500 block w-full p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
             dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
              </div>
            </div>
            <div className="addtodo">

              <button onClick={onSubmitHandler} className="addtodo-btn">ADD Blog</button>
            </div>

          </div>

        </form>

        <div>

          {listdata?.map((row, index) => (
            <li key={row.id} className='listproduct'>
              <div className='listproduct-main'>
                <span className="listproduct-main-date">Created on :{row.formattedDate}</span>
                <p>{row.title}</p>
                <div>{row.description}</div>

              </div>
            </li>
          ))}
        </div>
      </div>
    </div>
  )
};




export async function getServerSideProps({ req }) {
  const session = await getSession({ req });
  if (!session) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false
      }
    }
  }

  return {
    props: {
      session
    }
  }
}
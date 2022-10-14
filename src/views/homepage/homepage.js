
import * as Icon from "react-feather"
import { Link } from "react-router-dom"
import "./homepage.css"
import { useState } from "react"
import Swal from "sweetalert2"

const Homepage = () => {
  const [data, setData] = useState(JSON.parse(localStorage.getItem("data")))
  const [selected, setSelected] = useState([])
  const [filter, setFilter] = useState("")
  const handleInputChange = (e) => {
    const { value } = e.target
    setFilter(value)
    let localData = JSON.parse(localStorage.getItem("data"))
    if (!localData) return
    const string = `${value}`
    const regex = new RegExp(string, "gi")
    localData = localData.filter((item) => regex.test(item.name) || regex.test(item.email) || regex.test(item.phone))
    setData(localData)
  }
  const handleSelected = (val) => {
    let s = []
    if (val === "all" && selected.length === data.length) setSelected([])
    else if (val === "all") {
      for (let i = 0; i < data?.length; i++) {
        s.push(i)
      }
      setSelected(s)
    } else if (selected.includes(val)) {
      s = selected.filter((item) => item !== val)
      setSelected(s)
    } else setSelected([...selected, val])
  }

  const DeleteEntry = ({ Delete, List, values, _id, dispatch }) => {
    Swal.fire({
      title: "Are you sure you want to delete the selected entries?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        const items = data.filter((item, i) => !selected.includes(i))
        setData(items)
        setSelected([])
        localStorage.setItem("data", JSON.stringify(items))
      }
    })
  }
  return (
    <div className="container-homepage">
      <div className="homepage">
        <div className="topbar">
          <h2>Aromatic bar</h2>
          <div>
            <span className="search">
              <input type="text" placeholder="search" name="filter" value={filter} onChange={handleInputChange} />
              <span>
                <Icon.Search color="#C4C4C4" />
              </span>
            </span>
            <button className="refresh">
              <Icon.RefreshCw color="#C4C4C4" />
            </button>
            <Link to="add-new">
              <button className="add-new">Add New</button>
            </Link>
          </div>
        </div>
        <p className="info">
          {`${data?.length || 0} records found.`} {filter !== "" && "Filter applied."}
        </p>
        <div className="data-table">
          <table>
            <tr className="table-top-row">
              <th className="select">
                <Icon.MinusSquare
                  onClick={() => handleSelected("all")}
                  className={selected.length === data?.length && "selected"}
                />
              </th>
              <th>Form Details</th>
              <th>Customer Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Please rate the quality of the service you recieved from your host</th>
              <th>Please rate the quality of your beverage</th>
              <th>Was our restaurant clean?</th>
              <th>Please rate your overall dining experience</th>
            </tr>
            {data?.map((item, index) => (
              <tr key={index}>
                <td className="select">
                  <Icon.CheckSquare
                    className={(selected.includes(index) || selected.includes("all")) && "selected"}
                    onClick={() => handleSelected(index)}
                  />
                </td>
                <td className="edit">
                  <Link to={`/add-new?index=${index}`}>View Details</Link>
                </td>
                <td>{item?.name}</td>
                <td>{item?.email}</td>
                <td>+{item?.phone}</td>
                <td>{item?.service}</td>
                <td>{item?.beverage}</td>
                <td>{item?.clean}</td>
                <td>{item?.dining}</td>
              </tr>
            ))}
          </table>
          {(!data || data?.length === 0) && (
            <div className="no-items">
              <span>
                <Icon.XOctagon size={48} />
              </span>
              <span>No Items to show</span>
              <Link to="add-new">
                <button className="add-new">Add New</button>
              </Link>
            </div>
          )}
        </div>
      </div>
      <button className="delete" onClick={DeleteEntry} disabled={selected?.length === 0}>
        Delete
      </button>
    </div>
  )
}
export default Homepage

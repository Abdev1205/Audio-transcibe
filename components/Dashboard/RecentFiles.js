import { React, useEffect, useState } from 'react'
import { ApiUrl } from '@/utils/BaseUrl';
import { MdDelete } from "react-icons/md"
import 'react-tooltip/dist/react-tooltip.css'
import { Tooltip } from 'react-tooltip'
import FilesDeleteModal from '../Modals/FilesDeleteModal';

const RecentFiles = ({ tableData, reloadData }) => {
  const [deleteModel, setDeleteModel] = useState(false)
  const [deleteType, setDeleteType] = useState("")
  const [deleteId, setDeleteId] = useState()
  const formatDate = (inputDate) => {
    const date = new Date(inputDate);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString().slice(-2); // Extract the last two digits of the year
    return `${month}-${day}-${year}`;
  };
  const formatDuration = (durationString) => {
    if (durationString && typeof durationString === 'string') {
      const [minutes, seconds] = durationString.split(' ').map((part) => parseInt(part, 10) || 0);
      return `${minutes}min ${seconds}sec`;
    }
    return 'N/A'; // Return a default value if the duration is not defined or in the wrong format
  };

  const [selectedRows, setSelectedRows] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  const handleRowCheckboxChange = (row) => {
    const selectedRowId = row._id;
    console.log(selectedRows.length, "length")

    if (selectedRows.includes(selectedRowId)) {
      // Deselect the row if it's already selected
      setSelectedRows(selectedRows.filter((id) => id !== selectedRowId));
    } else {
      // Select the row if it's not selected
      setSelectedRows([...selectedRows, selectedRowId]);
    }

    if (selectedRows.length == 0) {
      setDeleteType("single");
      setDeleteId(`/${selectedRows[0]}`)
      console.log("single", selectedRows[0])
    }
    else {
      setDeleteType("multiple")
    }
  };

  const handleSelectAllChange = () => {
    if (selectAll) {
      // Deselect all rows
      setSelectedRows([]);
    } else {
      // Select all rows
      const allRowIds = tableData.map((row) => row._id);
      setSelectedRows(allRowIds);
    }

    setSelectAll(!selectAll);
    if (selectedRows.length === 0) {
      setDeleteType("single");
      setDeleteId(`/${selectedRows[0]}`)
    }
    else {
      setDeleteType("multiple")
    }
  };

  useEffect(() => {
    reloadData()

  }, [deleteModel])

  const isRowSelected = (row) => selectedRows.includes(row._id);

  return (
    <>
      <div className='p-[1.5rem] bg-white rounded-[1rem] border-[1px] border-[#E4E7EC] ' >
        <div className=' flex justify-between ' >
          <h2 className=' font-inter font-[600] text-[1.2rem] mt-[1rem] mb-[1rem] ' >Recent Files</h2>
          <div onClick={() => setDeleteModel(!deleteModel)} data-tooltip-id="delete-file-data" className={`cursor-pointer hover:scale-[1.3] duration-300 ${selectedRows.length > 0 ? "flex " : "hidden"} justify-center items-center w-[1.8rem] h-[1.8rem] rounded-full bg-red-200   `}>
            <MdDelete className=" text-[1.2rem] text-red-700 " />
          </div>
          <Tooltip
            id="delete-file-data"
            place="top"
            content={"Delete"}
            className='   '
          />
        </div>

        <table className="min-w-full border-collapse w-full  ">
          <thead>
            <tr>
              <th className="p-3 font-bold uppercase bg-primaryLight text-gray-600  hidden lg:table-cell">
                <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={handleSelectAllChange}
                  className=' flex justify-center items-center w-[1.1rem] h-[1.1rem] rounded-full '
                />
              </th>
              <th className="p-3 text-left font-inter font-[400] flex justify-start bg-primaryLight text-[#404040] lg:table-cell">
                Name
              </th>
              <th className="p-3 text-left font-inter font-[400] flex justify-start bg-primaryLight text-[#404040] lg:table-cell">
                Type
              </th>
              <th className="p-3 text-left font-inter font-[400] flex justify-start bg-primaryLight text-[#404040] lg:table-cell">
                Duration
              </th>
              <th className="p-3 text-left font-inter font-[400] flex justify-start bg-primaryLight text-[#404040] lg:table-cell">
                Date Created
              </th>
              <th className="p-3 text-left font-inter font-[400] flex justify-start bg-primaryLight text-[#404040] lg:table-cell">
                Last Updated
              </th>
              <th className="p-3 text-left font-inter font-[400] flex justify-start bg-primaryLight text-[#404040] lg:table-cell">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, index) => (
              <tr key={index}>
                <td className="p-3 border-b-[1px] border-[#E4E7EC] ">
                  <input
                    type="checkbox"
                    checked={isRowSelected(row)}
                    onChange={() => handleRowCheckboxChange(row)}
                    className='flex justify-center items-center w-[1.1rem] h-[1.1rem] rounded-full'
                  />
                </td>
                <td className="p-3 border-b-[1px] border-[#E4E7EC] ">{row.name}</td>
                <td className="p-3 border-b-[1px] border-[#E4E7EC] ">{row.fileType}</td>
                <td className="p-3 border-b-[1px] border-[#E4E7EC] ">{formatDuration(row.duration)}</td>
                <td className="p-3 border-b-[1px] border-[#E4E7EC] ">{formatDate(row.dateCreated)}</td>
                <td className="p-3 border-b-[1px] border-[#E4E7EC] ">{formatDate(row.dateCreated)}</td>
                <td className="p-3 border-b-[1px] border-[#E4E7EC]">
                  <a
                    href={`${ApiUrl}/${row.filePath}`}  // Provide the URL of the MP3 file
                    download
                    target='_blank'
                    className="text-blue-500 hover:underline cursor-pointer"
                  >
                    Download
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <FilesDeleteModal
          visible={deleteModel}
          onClose={() => setDeleteModel(false)}
          callback={() => reloadData()}
          idsToDelete={selectedRows}
          deleteType={deleteType}
          deleteId={deleteId}
        />
      </div>
    </>
  )
}

export default RecentFiles

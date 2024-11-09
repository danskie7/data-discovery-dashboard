"use client"

import { useEffect, useState } from 'react';

interface Company {
  id: number;
  name: string;
  description: string;
}

const CompanyList = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(5);
  const [total, setTotal] = useState<number>(0);
  const [selectedCompanies, setSelectedCompanies] = useState<number[]>([]);

  useEffect(() => {
    setLoading(true)
    fetch('/companies.json')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch companies');
        }
        return res.json();
      })
      .then((data) => {
        setTotal(data.companies.length);
        const start = (page - 1) * limit;
        const end = start + limit;
        setCompanies(data.companies.slice(start, end));
      })
      .catch((error) => {
        console.error('Error fetching the companies:', error);
      })
      .finally(() => {
        setLoading(false)
      });
  }, [page, limit]);

  const handleNextPage = () => {
    if (page < Math.ceil(total / limit)) {
      setPage(page + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleCheckboxChange = (companyId: number) => {
    if (selectedCompanies.includes(companyId)) {
      setSelectedCompanies((prevSelected) =>
        prevSelected.filter((id) => id !== companyId)
      );
    } else {
      setSelectedCompanies((prevSelected) => [...prevSelected, companyId]);
    }
  };

  const handleDeleteRequest = () => {
    if (selectedCompanies.length === 0) {
      alert('Please select at least one company.');
      return;
    }
  
    // Fetch POST request to the API route
    fetch('/api/request-delete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ companyIds: selectedCompanies }),  // Send the selected company IDs
    })
      .then((response) => response.json())
      .then((data) => {
        alert(data.message);
        setSelectedCompanies([]);  // Clear the selection after success
      })
      .catch((error) => {
        console.error('Error submitting the data deletion request:', error);
      });
  };

  return (
    <>
      {loading ? (
        <div role="status">
          <svg aria-hidden="true" className="mx-auto mt-20 w-40 h-40 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
      <div className="bg-white shadow-md rounded p-6">
          <h1 className="text-2xl font-bold mb-4 text-black">Company List</h1>
          <ul>
            {companies.map((company) => (
              <li key={company.id} className="border-b py-4 flex items-center">
                <input
                  type="checkbox"
                  className="mr-4"
                  checked={selectedCompanies.includes(company.id)}
                  onChange={() => handleCheckboxChange(company.id)}
                />
                <div>
                  <h2 className="text-lg font-semibold text-black">{company.name}</h2>
                  <p className='text-black'>{company.description}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex justify-between">
            <button
              className="bg-gray-800 py-2 px-4 rounded disabled:opacity-50"
              onClick={handlePreviousPage}
              disabled={page === 1}
            >
              Previous
            </button>
            <button
              className="bg-gray-800 py-2 px-4 rounded disabled:opacity-50"
              onClick={handleNextPage}
              disabled={page >= Math.ceil(total / limit)}
            >
              Next
            </button>
          </div>
          <div className="mt-6">
            <button
              className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700"
              onClick={handleDeleteRequest}
            >
              Delete data
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default CompanyList;

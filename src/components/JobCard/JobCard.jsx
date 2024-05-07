import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobData } from "../../redux/jobSlicer";
import { GiSandsOfTime } from "react-icons/gi";
import { FaCheckSquare } from "react-icons/fa";
import { AiFillThunderbolt } from "react-icons/ai";
import "./JobCard.scss";

const JobCard = () => {
  const dispatch = useDispatch();
  const { data, isLoading } = useSelector((state) => state.jdList);
  const [page, setPage] = useState(0);
  const [viewJobBtn, setViewJobBtn] = useState({});
  const [companyFilter, setCompanyFilter] = useState("");
  const [expFilter, setExpFilter] = useState("");
  const [salaryFilter, setSalaryFilter] = useState("");

  const limit = 10;

  console.log("data", data);
  useEffect(() => {
    const offset = page * limit;
    dispatch(fetchJobData({ limit, offset }));
  }, [page]);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.offsetHeight
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handleViewJob = (index) => {
    setViewJobBtn((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // const filteredData = data.filter((item) =>
  //   item.companyName.toLowerCase().includes(companyFilter.toLowerCase())
  // );

  const filteredData = data.filter((item) => {
    if (companyFilter && expFilter && salaryFilter) {
      return (
        item.companyName.toLowerCase().includes(companyFilter.toLowerCase()) &&
        item.minExp === parseInt(expFilter) &&
        item.minJdSalary >= parseInt(salaryFilter)
      );
    } else if (companyFilter && expFilter) {
      return (
        item.companyName.toLowerCase().includes(companyFilter.toLowerCase()) &&
        item.minExp === parseInt(expFilter)
      );
    } else if (companyFilter && salaryFilter) {
      return (
        item.companyName.toLowerCase().includes(companyFilter.toLowerCase()) &&
        item.minJdSalary >= parseInt(salaryFilter)
      );
    } else if (expFilter && salaryFilter) {
      return (
        item.minExp === parseInt(expFilter) &&
        item.minJdSalary >= parseInt(salaryFilter)
      );
    } else if (companyFilter) {
      return item.companyName
        .toLowerCase()
        .includes(companyFilter.toLowerCase());
    } else if (expFilter) {
      return item.minExp === parseInt(expFilter);
    } else if (salaryFilter) {
      return item.minJdSalary >= parseInt(salaryFilter);
    } else {
      return true;
    }
  });

  return (
    <div className="job-container">
      <div className="job-inputfilters">
        <input
          className="job-inputfilters_input"
          type="text"
          placeholder="Filter by company name"
          value={companyFilter}
          onChange={(e) => setCompanyFilter(e.target.value)}
        />
        <input
          className="job-inputfilters_input"
          type="text"
          placeholder="Experience"
          value={expFilter}
          onChange={(e) => setExpFilter(e.target.value)}
        />
        <input
          className="job-inputfilters_input"
          type="text"
          placeholder="Minimum Salary"
          value={salaryFilter}
          onChange={(e) => setSalaryFilter(e.target.value)}
        />
      </div>
      <div className="job-main">
        {filteredData.map((item, index) => (
          <div className="job-card" key={index}>
            <div className="job-latest">
              <GiSandsOfTime />
              <p>Posted 10 days ago</p>
            </div>
            <div className="job-role">
              <img
                src={item.logoUrl}
                alt="company logo"
                className="job-role_image"
              />
              <div className="job-role_company">
                <p className="job-role_company__name">{item.companyName}</p>
                <p className="job-role_company__role">{item.jobRole}</p>
                <p className="job-role_company__location">{item.location}</p>
              </div>
            </div>
            <div className="job-salary">
              <p>
                Estimated Salary:{" "}
                {item.minJdSalary && `₹${item.minJdSalary} - `}₹
                {item.maxJdSalary} LPA
              </p>
              <FaCheckSquare style={{ color: "green", paddingLeft: "4px" }} />
            </div>
            <div className="job-aboutus">
              <p className="job-aboutus_company">About Company:</p>
              <p className="job-aboutus_about">About us</p>
              <p
                className={`job-aboutus_desc ${
                  viewJobBtn[index] && "job-aboutus_showAllDesc"
                }`}
              >
                {item.jobDetailsFromCompany}
              </p>
              {!viewJobBtn[index] && (
                <button
                  className="job-aboutus_viewjob"
                  onClick={() => handleViewJob(index)}
                >
                  View job
                </button>
              )}
              <p className="job-aboutus_exptext">Minimum Experience</p>
              <p className="job-aboutus_expyear">{item.minExp} years</p>
            </div>
            <div className="job-buttons">
              <button className="job-buttons_easyapply">
                <AiFillThunderbolt
                  style={{
                    fontSize: "24",
                    color: "#FFD700",
                    paddingRight: "4px",
                  }}
                />
                Easy Apply
              </button>
              <button className="job-buttons_referral">
                Unlock referral asks
              </button>
            </div>
          </div>
        ))}
        {isLoading && <p>Loading...</p>}
      </div>
    </div>
  );
};

export default JobCard;

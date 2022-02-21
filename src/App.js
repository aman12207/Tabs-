import React, { useState, useEffect } from 'react'
import { FaAngleDoubleRight } from 'react-icons/fa'
const url = 'https://course-api.com/react-tabs-project'

function App() {
  const [loading, setLoading] = useState(true);
  const [lists,setLists] = useState([]);
  const [selectedTab,setTab] = useState(0);
   const fetchList = async() =>{
     setLoading(true);            //to make sure every time data fetch Loading... will show
       try {
        const response = await fetch(url);
        const data = await response.json();
        setLists(data);
        setLoading(false);
       } catch (error) {
         console.log(error);
        setLoading(false);
       }
  }
   useEffect(()=>{
    fetchList();
   },[])

   console.log(lists);

   if(loading)
    return <div className='section loading'>
      <h1>Loading...</h1>
    </div>

   const {company,title,dates,duties} = lists[selectedTab];
  return (
  <section className='section'>
    <div className='title'>
      <h2>experience</h2>
      <div className='underline'></div>
    </div>

    <div className="jobs-center">
      <div className='btn-container'>
        {lists.map((list,index)=>{
          return <button
                  key={list.id}
                  onClick={() => setTab(index)}
                  className={`job-btn ${index === selectedTab && 'active-btn'}`}
                >
                  {list.company}
                </button>
        })}
      </div>
    <article className="job-info">
          <h3>{title}</h3>
          <h4>{company}</h4>
          <p className="job-date">{dates}</p>
          {duties.map((duty, index) => {
            return (
              <div key={index} className="job-desc">
                <FaAngleDoubleRight className="job-icon"></FaAngleDoubleRight>
                <p>{duty}</p>
              </div>
            )
          })}
        </article>
    </div>
    <button type="button" className="btn">
        more info
      </button>
  </section>
  )
        }
export default App;

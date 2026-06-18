import './App.css'
import Footer from './components/Footer'
import Header from './components/Header'
import ProjectElement from './components/ProjectElement'
import projectData from './projects.json'

interface Project {
  id : number,
  name : string,
  desc : string,
  tags : string,
}
function App() {

  const projects = projectData.projects
  return (
    <div id='container'>
      <Header/>
      {
        projects.map((p : Project)=>{
          return(
            <ProjectElement
              key={p.id}
              name={p.name}
              desc={p.desc}
            />
          )
        })
      }
      <Footer/>
    </div>
  )
}

export default App
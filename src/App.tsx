import { useEffect, useState } from 'react'
import './App.css'
import Footer from './components/Footer'
import Header from './components/Header'
import ProjectElement from './components/ProjectElement'
import projectData from './projects.json'
import ProjectDialog from './components/ProjectDialog'

interface Project {
  id : number,
  name : string,
  desc : string,
  longDesc : string,
  tags : string,
  url : string,
}
export interface Tag {
  id : number,
  name : string,
  count : number,
  active : boolean,
}
function App() {
  const projects : Project[] = projectData.projects;
  
  const getTagList = (arr : Project[])=>{
    let index : number = 0; // index to give unique id's
    let tags : Tag[] = []; // tags to send forward
    let tagNames : string[] = []; // names for preventing doubles
    for(let i in arr){ // go through every project
      let tagList = arr[i].tags.split(","); // tag str into array
      for(let j in tagList){ // go through every tag of a project
        if(!tagNames.includes(tagList[j])){
          index++;
          tagNames.push(tagList[j]);
          tags.push({id : index, name : tagList[j], count : 0, active : false});
        };
      };
      // then go through all the projects and their tags to update the counts
      for(let i in tags){
        let count = 0;
        for(let j in arr){
          let tagGroup = arr[j].tags.split(",")
          for(let k in tagGroup){
            if(tagGroup[k] == tags[i].name){
              count++;
            }
          }
        }
        tags[i].count = count;
      }
    };
    tags.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
    return tags.sort((a,b) => b.count - a.count);
  };
  const getProjectTags=(project : Project)=>{
    let tagID = 1;
    let arr : Tag[] = [];
    let tags = project.tags.split(",")
    for(let i in tags){
      arr.push({
        name : tags[i],
        id : tagID,
        count : 0,
        active : false,
      })
      tagID++;
    }
    return arr
  }
  const [clickedTags, setClickedTags] = useState<string[]>([]);
  const [showProject, setShowProject] = useState<number>(-1);
  const updateClickedTags=(tag : string, empty : boolean)=>{
    console.log(undefined != true, undefined == !true, !empty)
      if(clickedTags.includes(tag)){
          setClickedTags(clickedTags.filter((tagToRemove:string)=>tagToRemove != tag));
          // console.log("removing " + tag)
      }
      else if(!empty){
          setClickedTags([...clickedTags, tag]);
          // add another tag to the array
          // console.log("added " + tag + ", now " + clickedTags.join(","))
      }
      else{
          setClickedTags(tag.length > 0 ? [tag] : []);
          // length > 0 when clicked from the dialog
          // console.log("cleared tags" + ", now " + clickedTags.join(","))
      }
  }
  const allClickedTagsApply=(p : Project)=>{
    console.log(p.id);
    const projectTags : string[] = p.tags.split(",");
    let noTagsMissing : boolean = true;
    if(clickedTags.length == 0){
      return true;
    };
    for(let j in clickedTags){
      // go through all clicked tags
      // if a single clicked tag is missing from the project tags, discard project
      if(!projectTags.includes(clickedTags[j])){ // if clicked tag is included in project
        noTagsMissing = false;
        };
    };
    return noTagsMissing;
  };

  useEffect(()=>{
    console.log("current tags are: " + clickedTags.join(","))
  },[clickedTags])
  
  const projectsShown = projects.filter((p: Project)=>allClickedTagsApply(p));

  useEffect(()=>{
    console.log("arr length is " + projectsShown.length)
  },[projectsShown])

  return (
    <>
    {
      showProject >= 0 &&
      <>
        <ProjectDialog
          tagList={getProjectTags(projects[showProject-1])}
          longDesc={projects[showProject-1].longDesc}
          updateClickedTags={updateClickedTags}
          setShowProject={setShowProject}
          name={projects[showProject-1].name}
          url={projects[showProject-1].url}
        />
        <button
          onClick={()=>setShowProject(-1)}
          style={{height:"100vh", width:"100vw", left : "0", position:"fixed", top : 0, zIndex:1, opacity:0}}
        />
      </>
    }
      <div id='container' style={showProject >= 0 ? {filter: "blur(10px)"} : {}}>
        <Header
          tagList={getTagList(projects)}
          clickedTags={clickedTags}
          updateClickedTags={updateClickedTags}
        />
        <div id="projects" style={{overflow:'hidden', width:"100%"}}>

          {projectsShown.length == 0 ?
          <>
            <h1 style={{color:"rgb(250, 170, 170)", float:"left"}}>No projects match your filters ({clickedTags.join(", ")}).</h1>
          </> 
          :
          <>
          <div id='column1'>
            {
              projectsShown.map((p : Project, index : number)=>{
                if(index % 2 == 0){
                  return(
                    <ProjectElement
                      key={p.id}
                      id={p.id}
                      name={p.name}
                      desc={p.desc}
                      tagList={p.tags}
                      setShowProject={setShowProject}
                    />
                  )
                }
              })
            }
          </div>
          <div id='column2'>
            {
              projectsShown.map((p : Project, index)=>{
                if(index % 2 == 1){                  
                  return(
                    <ProjectElement
                      key={p.id}
                      id={p.id}
                      name={p.name}
                      desc={p.desc}
                      tagList={p.tags}
                      setShowProject={setShowProject}
                    />
                  )
                }
              })
            }
          </div>
          <div id='singlecolumn'>
            {
              projectsShown.map((p : Project)=>{
                  return(
                    <ProjectElement
                      key={p.id}
                      id={p.id}
                      name={p.name}
                      desc={p.desc}
                      tagList={p.tags}
                      setShowProject={setShowProject}
                    />
                  )
              })
            }
          </div>
            </>
          }
        </div>
        <Footer/>
      </div>
    </>
  )
}

export default App
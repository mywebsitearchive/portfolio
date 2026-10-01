const ProjectElement = ({name, desc, tagList, setShowProject, id} : {name : string, desc : string, tagList : string, setShowProject : any, id : number}) => {
    return(
        <button className="project" onClick={()=>{setShowProject(id); window.scroll({top : 0, left : 0, behavior : "smooth"})}}>
            <h1 className="project-header">{name}</h1>
            <p className="project-text">{desc}</p>
            <div className="tag-row">
                {tagList.split(",").map((tag : any, index)=>{
                    if(index < 4){
                        return(
                            <div className="tag" key={index}>
                                {tag}
                            </div>
                        )
                    }
                    else if(index == tagList.split(",").length-1){
                        return(
                            <div className="tag" style={{color:"white"}} key={index}>
                                + {tagList.split(",").length-4} more
                            </div>
                        )
                    }
                })}
            </div>
        </button>
    )
}
export default ProjectElement;
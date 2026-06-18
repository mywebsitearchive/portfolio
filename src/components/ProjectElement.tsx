const ProjectElement = ({name, desc} : {name : string, desc : string,}) => {
    return(
        <div className="project">
            <h1>{name}</h1>
            <p>{desc}</p>
        </div>
    )
}
export default ProjectElement;
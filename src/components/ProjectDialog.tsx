import type { Tag } from "../App";
interface Hyperlink {
    error : boolean,
    url? : string,
    text? : string,
    textBefore? : string,
    textAfter? : string,
}

const ProjectDialog = (
    {name, longDesc, tagList, url, updateClickedTags, setShowProject} :
    {name : string, longDesc : string, tagList : Tag[], url : string, updateClickedTags : any, setShowProject : any}) => {

    const isHyperLink=(text : string)=>{
        if(text.search(/\[[^\]]+\]\([^\)]+\)/g) == -1){
            return {error : true}
        }
        else{
            let hyperlink = (text.match(/\[[^\]]+\]\([^\)]+\)/g) || "")[0];
            let textBefore = text.search(/^[^\[]+/g);
            let textAfter = text.search(/[^\)]+$/g);
            return(
                {
                    error : false,
                    text : (hyperlink.match(/[^\(\)\[\]]+/g) || "")[0],
                    url : (hyperlink.match(/[^\(\)\[\]]+/g) || "")[1],
                    textBefore : textBefore != -1 ? String(text.match(/^[^\[]+/g)) : "",
                    textAfter : textAfter != -1 ? String(text.match(/[^\)]+$/g)) : "",
                }
            )
        }
    }
    const hLink : Hyperlink = isHyperLink(longDesc);

    return(
        <div className="dialog">
            <div className="dialog-top">
                <h1 style={{float:"left", marginLeft : "30px", marginRight : "10px"}}>{name}</h1>
                <a href={url} target="_blank" style={{float:"right", marginRight : "30px", marginLeft : "10px"}}>
                    <div className="github-link">View on GitHub!</div>
                </a>
            </div>
            <p>
                {hLink.error ?
                    longDesc : 
                    <>
                        <span>{hLink.textBefore}</span>
                            <a href={hLink.url}>
                                {hLink.text}
                            </a>
                        <span>{hLink.textAfter}</span>
                    </>
                }
            </p>
            <div className="tag-row">
                    {tagList &&
                        tagList.map((t : Tag)=>{
                            return(
                                <button
                                    onClick={()=>{updateClickedTags(t.name, true); setShowProject(-1)}}
                                    className="tag-button"
                                    key={t.id}
                                    style={{backgroundColor:"rgb(70, 70, 70)"}}
                                >
                                    {t.name}
                                </button>
                            )
                        })
                    }
            </div>
            <button className="close-window" onClick={()=>setShowProject(-1)}>Close</button>
        </div>
    )
}
export default ProjectDialog;
import type { Tag } from "../App"

const TagRow = ({tagList, updateClickedTags, clickedTags, showFewerTags, setShowFewerTags} : {tagList: Tag[], updateClickedTags: any, clickedTags: string[], showFewerTags: any, setShowFewerTags: any}) => {
    return(
        <div id="tag-row">
            {tagList &&
            <>
                        <button
                            onClick={()=>updateClickedTags("", true)}
                            className="tag-button"
                            disabled={clickedTags.length == 0}
                            style={{color:"rgb(255, 255, 255)"}}
                        >
                            Clear tags
                        </button>
                        { // clicked tags are shown first
                            tagList.filter((t:Tag)=>clickedTags.includes(t.name)).map((t : Tag)=>{
                                return(
                                    <button
                                        onClick={()=>updateClickedTags(t.name)}
                                        className="tag-button"
                                        key={t.id}
                                        style={{backgroundColor: clickedTags.includes(t.name)? "rgb(120, 120, 120)" : "rgb(70, 70, 70)"}}
                                    >
                                        {t.name} <span style={{color:"rgb(222, 222, 222)"}}>{t.count}</span>
                                    </button>
                                )
                            })
                        }
                        {
                            tagList.filter((t:Tag)=>!clickedTags.includes(t.name)).map((t : Tag, index : number)=>{ // non-clicked tags are shown after
                                if(showFewerTags){ // if only the first 5 are shown
                                    if(index < 5 - clickedTags.length){ // first five tags with indices 0 to 4
                                        return(
                                            <button
                                                onClick={()=>updateClickedTags(t.name)}
                                                className="tag-button"
                                                key={t.id}
                                                style={{backgroundColor: clickedTags.includes(t.name)? "rgb(120, 120, 120)" : "rgb(70, 70, 70)"}}
                                            >
                                                {t.name} <span style={{color:"rgb(222, 222, 222)"}}>{t.count}</span>
                                            </button>
                                        )
                                    }
                                    if(index == 5 - clickedTags.length){
                                        return(
                                            <button
                                                onClick={()=>setShowFewerTags(!showFewerTags)}
                                                className="tag-button"
                                                key={t.id}
                                                style={{color:"white"}}
                                            >
                                                Show all
                                            </button>
                                        )
                                    }
                                }
                                else{
                                        return(
                                            <button
                                                onClick={()=>updateClickedTags(t.name)}
                                                className="tag-button"
                                                key={t.id}
                                                style={{backgroundColor: clickedTags.includes(t.name)? "rgb(120, 120, 120)" : "rgb(70, 70, 70)"}}
                                            >
                                                {t.name} <span style={{color:"rgb(222, 222, 222)"}}>{t.count}</span>
                                            </button>
                                        )
                                }
                            })
                        }
                        {!showFewerTags &&
                            <button
                                className="tag-button"
                                onClick={()=>setShowFewerTags(!showFewerTags)}
                                style={{color:"white"}}
                            >
                                Show fewer</button>
                            
                        }
            </>
            }
        </div>
    )
}
export default TagRow;
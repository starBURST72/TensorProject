const elements=[
    {
        name:'Мост влюбленных',
        address:'г.Тюмень, Набережная',
        order:'1'
    },
    {
        name:'Вкусно и точка',
        address:'Тюмень. ул Мориса Тореза',
        order:'2'
    },
    {
        name:'Драмтеатр',
        address:'г.Тюмень, ул.Республики,129',
        order:'1'
    }
]
export function ElementsList() {
    return(
        <>
        <h1>Video List</h1>
            {
                elements.map((element)=>{
                    return(
                        <div>
                            <p>{element.name}</p>
                            <p>{element.address}</p>
                            <button>Убрать!</button>
                        </div>
                    )
                })
            }
    </>
            )
    
}
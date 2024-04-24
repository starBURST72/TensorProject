export const elements=[
    {
        name:'Мост влюбленных',
        address:'г.Тюмень, Набережная',
        order:0
    },
    {
        name:'Вкусно и точка',
        address:'Тюмень. ул Мориса Тореза',
        order:1
    },
    {
        name:'Драмтеатр',
        address:'г.Тюмень, ул.Республики,129',
        order:2
    }
]
export function ElementsList() {
    return(
        <>
        <h1>Маршрут</h1>
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
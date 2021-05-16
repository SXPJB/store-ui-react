export default function CardComponent(props) {
    return (
        <div className="card">
            <div className="card">
                <div className="card-header">
                    <h1>{props.data.title}</h1>
                </div>
                <div className="card-body">
                    <img
                        src={props.data.image1}
                        className="responsiveIMG"
                        alt={props.data.title}
                    />
                    <div className='py-3'>
                        <p>{props.data.description}</p>
                        <div className="container">
                            <div className="row">
                                <div className="col">
                                    <p>
                                        Existencia: {props.data.inventary}
                                    </p>
                                </div>
                                <div className="col">
                                    <p className="text-end">
                                        Precio: ${new Intl.NumberFormat().format(props.data.price)}
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="card-footer text-end">
                    <button className="btn btn-success" onClick={()=>addCard(props.data.id)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                             className="bi bi-bag-plus-fill" viewBox="0 0 16 16">
                            <path fill-rule="evenodd"
                                  d="M10.5 3.5a2.5 2.5 0 0 0-5 0V4h5v-.5zm1 0V4H15v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4h3.5v-.5a3.5 3.5 0 1 1 7 0zM8.5 8a.5.5 0 0 0-1 0v1.5H6a.5.5 0 0 0 0 1h1.5V12a.5.5 0 0 0 1 0v-1.5H10a.5.5 0 0 0 0-1H8.5V8z"/>
                        </svg>{" "}
                        Agregar al carrito
                    </button>
                </div>
            </div>
        </div>
    )
}

function addCard(id){
    console.log(id)
}
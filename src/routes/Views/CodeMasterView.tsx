import { ChangeEvent, FormEvent } from "react"
function CodeMasterView({ handleChange, handleChangeNum, handleSubmit } : 
    { handleChange: (e: ChangeEvent<HTMLInputElement>) => void, 
        handleChangeNum: (e: ChangeEvent<HTMLInputElement>) => void, 
        handleSubmit: (e: FormEvent<HTMLFormElement>) => void }) {
    return (
        <form onSubmit= { handleSubmit }>
            <div className="form-group row fade-in">
                <div className="col-3" />
                <div className="col-6">
                <div className="row">
                    <div className="col-md-6">
                    <input
                        className="form-control"
                        type="text"
                        id="clue-input-field"
                        placeholder="Type your 1 word clue here"
                        onChange = { handleChange }
                    />
                    </div>
                    <div className="col-md-2">
                        <input type="text" className="form-control" id="clueNum-input-field"
                        placeholder="#" onChange = { handleChangeNum }/>
                    </div>
                    <div className="col-md-4">
                        <button type="submit" 
                        className="btn btn-primary">
                            Give Clue
                        </button>
                    </div>
                </div>
                </div>
                <div className="col-3" />
            </div>
        </form>
    )
}
export default CodeMasterView
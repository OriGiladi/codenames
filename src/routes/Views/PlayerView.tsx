function PlayerView() {
    return (
        <div  className="form-group row">
            <div className="col-3" />
            <div className="col-6">
                <input className="form-control" type="text" id="clue-input-field" disabled />
            </div>
            <div className="col-3" />
        </div>
    )
}
export default PlayerView
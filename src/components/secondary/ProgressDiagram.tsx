const ProgressDiagram = () => {
    return (
        <div className="circular-progress "
            style={{
                background: 'conic-gradient(purple 70%, #d4d4d4 70%)'
            }}>
            <div className="circle" >
                <span className="score">{70}%</span>
            </div>
        </div>
    )
}

export default ProgressDiagram
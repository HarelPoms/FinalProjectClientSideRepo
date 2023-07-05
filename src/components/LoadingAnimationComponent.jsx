import { CirclesWithBar } from  'react-loader-spinner'

const LoadingAnimationComponent = () => {
    return <div
        style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
        }}
    >
        <CirclesWithBar height="400" width="400" color="#4fa94d" wrapperStyle={{}} wrapperClass=""
            visible={true} outerCircleColor="" innerCircleColor="" barColor="" ariaLabel='circles-with-bar-loading' />
    </div>;
}

export default LoadingAnimationComponent;
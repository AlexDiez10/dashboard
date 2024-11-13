interface Config {
    title?:String;
    subtitle?:String;
    value:Number;
}

export default function Indicator(config:Config){
    return (
        <>
            {config.title}<br />
            {config.value.toString()}<br />
            {config.subtitle}
        </>
    )
}
import InputTwoThumb from './subComponents/InputTwoThumb'
import FIlterWrapper from 'components/AdvSeachFilterWrapper/FIlterWrapper'

type Props = {
    title: string,
    isMulti?: boolean,
    min: number,
    max: number, minValue: number,
    maxValue: number,
    setMinValue: (newValue: number) => void,
    setMaxValue: (newValue: number) => void,
    minDistance?: number,
    placeholder?: string
}

export default function InputRange(props: Props) {
    const { title } = props
    return (
        <FIlterWrapper title={title}>
            <InputTwoThumb {...props} />
        </FIlterWrapper>
    )
}
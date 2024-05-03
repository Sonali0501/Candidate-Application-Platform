import SelectInput from '../SelectInput';
import './Filters.css'

const roleOptions = ['Frontend', 'Backend', 'IOS', 'Android', 'Tech Lead', 'Flutter', 'React Native', 'Data Science'];
const experienceOptions = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']

const Filters: React.FC = () => {
    return (
        <div className='filters-container'>
            <SelectInput label='Experience' name='experience' options={experienceOptions} />
            <SelectInput label='Role' name='role' options={roleOptions} />
        </div>
    )
}

export default Filters;
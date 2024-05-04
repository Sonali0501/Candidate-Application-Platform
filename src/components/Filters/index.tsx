import SelectInput from '../SelectInput';
import TextInput from '../TextInput';
import './Filters.css'

const roleOptions = ['Frontend', 'Backend', 'IOS', 'Android', 'Tech Lead', 'Flutter', 'React Native', 'Data Science'];
const experienceOptions = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']

const Filters: React.FC = () => {
    return (
        <div className='filters-container'>
            <div className='filter-unit first'>
            <SelectInput label='Experience' name='experience' options={experienceOptions} />
            <SelectInput label='Role' name='role' options={roleOptions} />
            </div>
            <div className='filter-unit'>
            <TextInput placholder='Location' name='location' />
            <TextInput placholder='Company' name='company' />
            </div>
        </div>
    )
}

export default Filters;
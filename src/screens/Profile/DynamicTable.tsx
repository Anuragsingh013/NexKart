import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import DynamicTableNew from '../../components/DynamicTableNew'
import { dynamicSize, getFontSize } from '../../utils/responsive'
import { FontFamily } from '../../assets/fonts'

const DynamicTable = () => {
  // Define table headers - make sure they match the property names in row data
  const headers = ['Name', 'Age', 'City', 'Occupation', 'Department', 'Salary']

  // Create properly structured row data as an array of objects
  // Each object's values must be in the same order as the headers
  const rows = [
    {
      name: 'Alice Johnson',
      age: '28',
      city: 'New York',
      occupation: 'Software Engineer',
      department: 'Engineering',
      salary: '$95,000'
    },
    {
      name: 'Bob Smith',
      age: '34',
      city: 'San Francisco',
      occupation: 'Product Manager',
      department: 'Product',
      salary: '$120,000'
    },
    {
      name: 'Charlie Brown',
      age: '45',
      city: 'Chicago',
      occupation: 'Data Scientist',
      department: 'Analytics',
      salary: '$110,000'
    },
    {
      name: 'Diana Rodriguez',
      age: '31',
      city: 'Miami',
      occupation: 'UX Designer',
      department: 'Design',
      salary: '$85,000'
    },
    {
      name: 'Edward Williams',
      age: '29',
      city: 'Seattle',
      occupation: 'DevOps Engineer',
      department: 'Infrastructure',
      salary: '$98,000'
    },
    {
      name: 'Fiona Zhang',
      age: '37',
      city: 'Boston',
      occupation: 'Marketing Director',
      department: 'Marketing',
      salary: '$130,000'
    },
    // Additional rows for demonstrating scrolling
    {
      name: 'George Patel',
      age: '33',
      city: 'Austin',
      occupation: 'Backend Developer',
      department: 'Engineering',
      salary: '$90,000'
    },
    {
      name: 'Hannah Lee',
      age: '29',
      city: 'Portland',
      occupation: 'Frontend Developer',
      department: 'Engineering',
      salary: '$88,000'
    },
    {
      name: 'Ian Thompson',
      age: '41',
      city: 'Denver',
      occupation: 'Project Manager',
      department: 'Operations',
      salary: '$105,000'
    },
    {
      name: 'Julia Garcia',
      age: '36',
      city: 'Los Angeles',
      occupation: 'VP of Sales',
      department: 'Sales',
      salary: '$145,000'
    },
    {
      name: 'Kevin Chen',
      age: '32',
      city: 'Philadelphia',
      occupation: 'QA Engineer',
      department: 'Engineering',
      salary: '$82,000'
    },
    {
      name: 'Laura Wilson',
      age: '39',
      city: 'Atlanta',
      occupation: 'HR Manager',
      department: 'Human Resources',
      salary: '$95,000'
    },
    {
      name: 'Kevin Chen',
      age: '32',
      city: 'Philadelphia',
      occupation: 'QA Engineer',
      department: 'Engineering',
      salary: '$82,000'
    },
    {
      name: 'Laura Wilson',
      age: '39',
      city: 'Atlanta',
      occupation: 'HR Manager',
      department: 'Human Resources',
      salary: '$95,000'
    },
    {
      name: 'Kevin Chen',
      age: '32',
      city: 'Philadelphia',
      occupation: 'QA Engineer',
      department: 'Engineering',
      salary: '$82,000'
    },
    {
      name: 'Laura Wilson',
      age: '39',
      city: 'Atlanta',
      occupation: 'HR Manager',
      department: 'Human Resources',
      salary: '$95,000'
    },
    {
      name: 'Kevin Chen',
      age: '32',
      city: 'Philadelphia',
      occupation: 'QA Engineer',
      department: 'Engineering',
      salary: '$82,000'
    },
    {
      name: 'Laura Wilson',
      age: '39',
      city: 'Atlanta',
      occupation: 'HR Manager',
      department: 'Human Resources',
      salary: '$95,000'
    },
  ]

  // Calculate sum for the salary column to display in footer
  const totalEmployees = rows.length

  // Define footer data
  // const footers = [`Total Employees: ${totalEmployees}`]
  // const footers = rows.map((item) => `${item.salary}`)
    const footers = ["50","100","150","50","100","150",]

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Employee Directory</Text>
      <Text style={styles.subtitle}>Scroll horizontally to view all columns</Text>
      <View style={styles.tableContainer}>
        <DynamicTableNew
          headerData={headers}
          rowData={rows}
          footerData={footers}
          fixedScroll={true}  // Enable fixed left column
          verticalScroll={true}  // Enable vertical scrolling
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: dynamicSize(16),
    backgroundColor: '#fff'
  },
  title: {
    fontSize: getFontSize(22),
    fontFamily: FontFamily.sofiaProBold,
    marginBottom: dynamicSize(8),
    textAlign: 'center',
    color: '#333'
  },
  subtitle: {
    fontSize: getFontSize(14),
    fontFamily: FontFamily.sofiaProRegular,
    marginBottom: dynamicSize(16),
    textAlign: 'center',
    color: '#666'
  },
  tableContainer: {
    flex: 1,
    borderRadius: dynamicSize(8),
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  }
})

export default DynamicTable
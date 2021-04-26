console.log('boring');

const flag = process.env.NODE_ENV !== 'development'

if(flag && true) {
    console.log(123)
}

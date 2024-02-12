export function validateNodeVersion() {
	const minNodeVersion = {
		major: 18,
		minor: 13,
		patch: 0,
	}
	const minNodeVersionStr = `${minNodeVersion.major}.${minNodeVersion.minor}.${minNodeVersion.patch}`
	const nodeVersion = process.version.split('.')
	const major = parseInt(nodeVersion[0].replace(/\D/g, ''), 10)
	const minor = parseInt(nodeVersion[1].replace(/\D/g, ''), 10)
	const patch = parseInt(nodeVersion[2].replace(/\D/g, ''), 10)

	if (
		major < minNodeVersion.major ||
		(major === minNodeVersion.major &&
			(minor < minNodeVersion.minor || (minor === minNodeVersion.minor && patch < minNodeVersion.patch)))
	) {
		console.error()
		console.error('<<====================================================>>')
		console.error(' INCOMPATIBLE NODE VERSION')
		console.error(` Axion requires Node version ${minNodeVersionStr} or later`)
		console.error(` You are running Node version ${process.version}`)
		console.error(` Please install a version of Node >= ${minNodeVersionStr} and try again`)
		console.error('<<====================================================>>')
		console.error()

		process.exit(1)}
}



/** @type {import('next').NextConfig} */

module.exports = {
  env: {
    NEXT_PUBLIC_MAGIC_SECRET_KEY: process.NEXT_PUBLIC_MAGIC_SECRET_KEY,
    NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY,
  },
  images: {
    domains: [
      'lh3.googleusercontent.com',
      'ipfs.pixura.io',
      'cdn.hashaxis.com',
      'hashaxis.myfilebase.com',
      'pixura.imgix.net',
      'assets.raribleuserdata.com',
      'cdbs4.azurewebsites.net',
      "d150u0abw3r906.cloudfront.net",
      "arweave.net",
      "52.55.12.106",
      ""
    ],
  },
  // async redirects() {
  //   return [
  //     // Redirect the specific path(s) you want to disable
  //     {
  //       source: '/store/store-details',
  //       destination: '/', // Redirect to an error page
  //       permanent: false, // Set permanent to false for temporary redirects
  //     },
  //     {
  //       source: '/profile',
  //       destination: '/', // Redirect to an error page
  //       permanent: true, // Set permanent to false for temporary redirects
  //     },
  //   ];
  // },
}

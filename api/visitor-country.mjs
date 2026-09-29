export default {
  fetch(request) {
    const country = request.headers.get('x-vercel-ip-country')?.toUpperCase();
    return Response.json(
      { country: country && /^[A-Z]{2}$/.test(country) ? country : null },
      { headers: { 'Cache-Control': 'private, no-store' } }
    );
  }
};

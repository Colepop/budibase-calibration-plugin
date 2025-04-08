async function handler({ url }) {
  try {
    const response = await fetch(url, {
      method: "POST"
    });

    const result = await response.json();
    return {
      success: true,
      data: result
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
}

module.exports = { handler };

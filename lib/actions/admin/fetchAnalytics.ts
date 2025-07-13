"use server";

export async function getAnalytics() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/admin/analytics`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch analytics");
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching analytics:", error);
    return null;
  }
}

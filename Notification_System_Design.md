Campus Notification System-Stage1
Approach:
The system fetches notifications from the provided Notification API.

Each notification contains:
1.ID
2.Type
3.Message
4.Timestamp

Notifications are prioritized based on a combination of weight:
1. Placement
2. Result
3. Event
Notifications with the same type are ordered by timestamp in descending order (most recent first).
After sorting, the top 10 notifications are selected and displayed.
Algorithm : 
1. Fetch notifications from API.
2. Assign priority weights:

   * Placement = 3
   * Result = 2
   * Event = 1
3. Sort by priority.
4. Sort by timestamp for equal priorities.
5. Select first 10 notifications.

